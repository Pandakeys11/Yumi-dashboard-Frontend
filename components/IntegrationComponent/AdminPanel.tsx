import { useState } from "react";
import {
  useFundsCollected,
  useFundToken,
  useTotalFundsRaised,
  useTotalFundsWithdrawn,
  useNFTPrice,
  useDoubleMintPrice,
  useBulkMintPrice,
} from "../../hooks/useNftReadMethods";
import {
  useWithdrawFunds,
  useSetBaseURI,
  useSetFundToken,
  useUpdatePrices,
} from "../../hooks/useNftWriteMethods";
import { useToast } from "../Toast/ToastProvider";
import {
  useTokenInfo,
  useTokenDecimals,
  YUMI_TOKEN_ADDRESS,
} from "../../hooks/useYumiToken";
import { formatUnits } from "viem";

function AdminPanel() {
  const [newURI, setNewURI] = useState("");
  const [newTokenAddress, setNewTokenAddress] = useState<`0x${string}`>(
    "" as `0x${string}`,
  );
  const [newSinglePrice, setNewSinglePrice] = useState("");
  const [newDoublePrice, setNewDoublePrice] = useState("");
  const [newBulkPrice, setNewBulkPrice] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAll, setWithdrawAll] = useState(true);

  const { showToast } = useToast();
  const {
    withdrawFunds,
    isPending: isWithdrawPending,
    isConfirming: isWithdrawConfirming,
    isSuccess: isWithdrawSuccess,
    error: withdrawError,
  } = useWithdrawFunds();
  const {
    setBaseURI,
    isPending: isURIPending,
    isConfirming: isURIConfirming,
    isSuccess: isURISuccess,
    error: uriError,
  } = useSetBaseURI();
  const {
    setFundToken,
    isPending: isTokenPending,
    isConfirming: isTokenConfirming,
    isSuccess: isTokenSuccess,
    error: tokenError,
  } = useSetFundToken();
  const {
    updatePrices,
    isPending: isPricesPending,
    isConfirming: isPricesConfirming,
    isSuccess: isPricesSuccess,
    error: pricesError,
  } = useUpdatePrices();

  const { fundsCollected, isLoading: fundsLoading } = useFundsCollected();
  const { data: currentTokenAddress, isLoading: tokenAddressLoading } =
    useFundToken();
  const { totalFundsRaised, isLoading: raisedLoading } = useTotalFundsRaised();
  const { totalFundsWithdrawn, isLoading: withdrawnLoading } =
    useTotalFundsWithdrawn();
  const { data: currentSinglePrice, isLoading: singlePriceLoading } =
    useNFTPrice();
  const { data: currentDoublePrice, isLoading: doublePriceLoading } =
    useDoubleMintPrice();
  const { data: currentBulkPrice, isLoading: bulkPriceLoading } =
    useBulkMintPrice();
  const { data: tokenDecimals, isLoading: isDecimalsLoading } =
    useTokenDecimals();

  const { name, symbol, isLoading: tokenInfoLoading } = useTokenInfo();

  const formatTokenAmount = (amount: bigint | undefined) => {
    if (!amount) return "0";
    const decimalPlaces = Number(tokenDecimals || 9);
    return formatUnits(amount, decimalPlaces);
  };

  const handleSetURI = async () => {
    if (!newURI || newURI.trim() === "") {
      console.error("URI cannot be empty");
      showToast("URI cannot be empty", "error");
      return;
    }

    try {
      if (!newURI.startsWith("ipfs://") && !newURI.startsWith("https://")) {
        showToast("URI should start with ipfs:// or https://", "error");
        throw new Error("URI should start with ipfs:// or https://");
      }

      await setBaseURI(newURI);

      if (isURISuccess) {
        setNewURI("");
        showToast("URI updated successfully!", "success");
      }
    } catch (err) {
      console.error("Error setting base URI:", err);
      showToast("Error setting base URI", "error");
    }
  };

  const handleSetToken = async () => {
    if (
      !newTokenAddress ||
      !newTokenAddress.startsWith("0x") ||
      newTokenAddress.length !== 42
    ) {
      console.error("Invalid token address");
      showToast("Invalid token address", "error");
      return;
    }

    try {
      await setFundToken(newTokenAddress);
      showToast("Token address updated successfully!", "success");
      if (isTokenSuccess) {
        setNewTokenAddress("" as `0x${string}`);
      }
    } catch (err) {
      console.error("Error updating token address:", err);
      showToast("Error updating token address", "error");
    }
  };

  const handleWithdraw = async () => {
    try {
      if (withdrawAll) {
        await withdrawFunds();
        showToast("All funds withdrawn successfully!", "success");
      } else {
        if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
          showToast("Please enter a valid amount to withdraw", "error");
          return;
        }

        await withdrawFunds(withdrawAmount);
        showToast(
          `${withdrawAmount} ${symbol} withdrawn successfully!`,
          "success",
        );
        setWithdrawAmount("");
      }
    } catch (err) {
      console.error("Error withdrawing funds:", err);
      showToast("Error withdrawing funds", "error");
    }
  };

  const handleUpdatePrices = async () => {
    if (!newSinglePrice || !newDoublePrice || !newBulkPrice) {
      showToast("All price fields must be filled", "error");
      return;
    }

    try {
      if (
        parseFloat(newSinglePrice) <= 0 ||
        parseFloat(newDoublePrice) <= 0 ||
        parseFloat(newBulkPrice) <= 0
      ) {
        showToast("Prices must be greater than zero", "error");
        return;
      }

      showToast("Updating prices...", "info");
      await updatePrices(newSinglePrice, newDoublePrice, newBulkPrice);

      if (isPricesSuccess) {
        setNewSinglePrice("");
        setNewDoublePrice("");
        setNewBulkPrice("");
        showToast("Prices updated successfully!", "success");
      }
    } catch (err) {
      console.error("Error updating prices:", err);
      showToast("Error updating prices", "error");
    }
  };

  return (
    <div className="yumi-card p-6">
      <h2 className="text-2xl font-semibold text-[#00ff9d] mb-4">
        YUMI Admin Panel
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#00ff9d]/30">
          <h3 className="text-xl text-white mb-4">Withdraw Funds</h3>
          <div className="bg-[#0a0a1a] p-3 rounded mb-4">
            <p className="text-gray-400 text-sm mb-1">Available funds</p>
            {fundsLoading || tokenInfoLoading ? (
              <p className="text-white text-xl font-medium">Loading...</p>
            ) : (
              <p className="text-white text-xl font-medium">
                {fundsCollected} {symbol}
              </p>
            )}
            <p className="text-gray-400 text-xs mt-1">
              Total Raised: {totalFundsRaised} {symbol || "YUMI"}
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Total Withdrawn: {totalFundsWithdrawn} {symbol || "YUMI"}
            </p>
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="withdrawAll"
              checked={withdrawAll}
              onChange={() => setWithdrawAll(!withdrawAll)}
              className="mr-2"
            />
            <label htmlFor="withdrawAll" className="text-white text-sm">
              Withdraw all available funds
            </label>
          </div>

          {!withdrawAll && (
            <div className="mb-4">
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder={`Amount to withdraw (${symbol})`}
                className="yumi-input w-full mb-2"
              />
            </div>
          )}

          <button
            onClick={handleWithdraw}
            disabled={
              isWithdrawPending ||
              isWithdrawConfirming ||
              fundsLoading ||
              (!withdrawAll && !withdrawAmount)
            }
            className="yumi-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isWithdrawPending
              ? "Preparing..."
              : isWithdrawConfirming
                ? "Confirming..."
                : withdrawAll
                  ? "Withdraw All Funds"
                  : `Withdraw ${withdrawAmount} ${symbol}`}
          </button>
          {isWithdrawSuccess && (
            <p className="mt-4 text-[#00ff9d] font-medium">
              Funds withdrawn successfully!
            </p>
          )}
          {withdrawError && (
            <p className="mt-4 text-[#ef4444] font-medium">
              Error: {withdrawError.message}
            </p>
          )}
        </div>

        <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#00ff9d]/30">
          <h3 className="text-xl text-white mb-4">Update Base URI</h3>
          <div className="mb-4">
            <label htmlFor="newURI" className="block text-gray-400 mb-2">
              New Base URI:
            </label>
            <input
              id="newURI"
              type="text"
              value={newURI}
              onChange={(e) => setNewURI(e.target.value)}
              placeholder="Enter new URI (e.g., ipfs://... or https://...)"
              className="yumi-input w-full"
            />
          </div>

          <button
            onClick={handleSetURI}
            disabled={!newURI || isURIPending || isURIConfirming}
            className="yumi-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isURIPending
              ? "Preparing..."
              : isURIConfirming
                ? "Confirming..."
                : "Update URI"}
          </button>
          {isURISuccess && (
            <p className="mt-4 text-[#00ff9d] font-medium">
              URI updated successfully!
            </p>
          )}
          {uriError && (
            <p className="mt-4 text-[#ef4444] font-medium">
              Error: {uriError.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#00ff9d]/30">
          <h3 className="text-xl text-white mb-4">Update NFT Prices</h3>

          <div className="bg-[#0a0a1a] p-3 rounded mb-4">
            <p className="text-gray-400 text-sm mb-3">Current Prices</p>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <p className="text-gray-400 text-xs">Single (1 NFT)</p>
                <p className="text-white">
                  {singlePriceLoading || isDecimalsLoading
                    ? "Loading..."
                    : `${formatTokenAmount(currentSinglePrice as bigint)} ${symbol}`}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Double (2 NFTs)</p>
                <p className="text-white">
                  {doublePriceLoading || isDecimalsLoading
                    ? "Loading..."
                    : `${formatTokenAmount(currentDoublePrice as bigint)} ${symbol}`}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Bulk (3 NFTs)</p>
                <p className="text-white">
                  {bulkPriceLoading || isDecimalsLoading
                    ? "Loading..."
                    : `${formatTokenAmount(currentBulkPrice as bigint)} ${symbol}`}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <div>
              <label className="block text-gray-400 text-xs mb-1">
                Single Price
              </label>
              <input
                type="number"
                value={newSinglePrice}
                onChange={(e) => setNewSinglePrice(e.target.value)}
                placeholder="e.g., 1000"
                className="yumi-input w-full text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">
                Double Price
              </label>
              <input
                type="number"
                value={newDoublePrice}
                onChange={(e) => setNewDoublePrice(e.target.value)}
                placeholder="e.g., 1800"
                className="yumi-input w-full text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">
                Bulk Price (3 NFTs)
              </label>
              <input
                type="number"
                value={newBulkPrice}
                onChange={(e) => setNewBulkPrice(e.target.value)}
                placeholder="e.g., 2700"
                className="yumi-input w-full text-sm"
              />
            </div>
          </div>

          <button
            onClick={handleUpdatePrices}
            disabled={
              !newSinglePrice ||
              !newDoublePrice ||
              !newBulkPrice ||
              isPricesPending ||
              isPricesConfirming
            }
            className="yumi-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPricesPending
              ? "Preparing..."
              : isPricesConfirming
                ? "Confirming..."
                : "Update Prices"}
          </button>
          {isPricesSuccess && (
            <p className="mt-4 text-[#00ff9d] font-medium">
              Prices updated successfully!
            </p>
          )}
          {pricesError && (
            <p className="mt-4 text-[#ef4444] font-medium">
              Error: {pricesError.message}
            </p>
          )}
        </div>

        <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#00ff9d]/30">
          <h3 className="text-xl text-white mb-4">Fund Token Management</h3>
          <div className="bg-[#0a0a1a] p-3 rounded mb-4">
            <p className="text-gray-400 text-sm mb-1">Current Token</p>
            {tokenAddressLoading ? (
              <p className="text-white text-xl font-medium">Loading...</p>
            ) : (
              <>
                <p className="text-white break-all">
                  {currentTokenAddress as `0x${string}`}
                </p>
                {tokenInfoLoading ? (
                  <p className="text-gray-400 text-sm mt-2">
                    Loading token info...
                  </p>
                ) : (
                  <p className="text-gray-400 text-sm mt-2">
                    {name} ({symbol}) - {tokenDecimals || 9} decimals
                  </p>
                )}
              </>
            )}
          </div>

          <div className="mb-2 bg-[#9333ea]/20 p-3 rounded">
            <p className="text-gray-300 text-sm">
              <span className="text-[#00ff9d] font-medium">YUMI Token: </span>
              {YUMI_TOKEN_ADDRESS}
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor="newToken" className="block text-gray-400 mb-2">
              New Token Address:
            </label>
            <input
              id="newToken"
              type="text"
              value={newTokenAddress}
              onChange={(e) =>
                setNewTokenAddress(e.target.value as `0x${string}`)
              }
              placeholder="Enter new token address (0x...)"
              className="yumi-input w-full"
            />
          </div>

          <button
            onClick={handleSetToken}
            disabled={!newTokenAddress || isTokenPending || isTokenConfirming}
            className="yumi-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isTokenPending
              ? "Preparing..."
              : isTokenConfirming
                ? "Confirming..."
                : "Update Token"}
          </button>
          {isTokenSuccess && (
            <p className="mt-4 text-[#00ff9d] font-medium">
              Token updated successfully!
            </p>
          )}
          {tokenError && (
            <p className="mt-4 text-[#ef4444] font-medium">
              Error: {tokenError.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
