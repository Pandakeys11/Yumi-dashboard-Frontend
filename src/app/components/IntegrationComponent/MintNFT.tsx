import { useState } from "react";
import { useAccount } from "wagmi";
import {
  useNFTPrice,
  useDoubleMintPrice,
  useBulkMintPrice,
  useFundToken,
} from "../../hooks/useNftReadMethods";
import { MintTypes } from "../../hooks/useNftWriteMethods";
import { erc20Abi, formatUnits } from "viem";
import { useToast } from "../Toast/ToastProvider";
import {
  useTokenInfo,
  useTokenAllowance,
  useTokenDecimals,
  YUMI_TOKEN_ADDRESS,
} from "../../hooks/useYumiToken";
import { YUMI_CONTRACT_ADDRESS, yumiABI } from "../../lib/utils/contract";
import { monadTestnet } from "@/app/lib/utils/constant";
import { waitForTransactionReceipt, writeContract } from "wagmi/actions";
import { wagmiConfig } from "@/app/lib/utils/wagmiConfig";
import useIsChainSupported from "@/app/lib/utils/hooks/useIsChainSupported";
import { DialogType, useDialog } from "../Dialog/dialog";

function MintNFT() {
  const { address } = useAccount();
  const { data: singlePrice, isLoading: singlePriceLoading } = useNFTPrice();
  const { data: doublePrice, isLoading: doublePriceLoading } =
    useDoubleMintPrice();
  const { data: bulkPrice, isLoading: bulkPriceLoading } = useBulkMintPrice();
  const { data: tokenAddress, isLoading: tokenAddressLoading } = useFundToken();
  const { data: tokenDecimals, isLoading: isDecimalsLoading } =
    useTokenDecimals();
  const [isMinting, setIsMinting] = useState(false);
  const [recipient, setRecipient] = useState<`0x${string}`>(
    "" as `0x${string}`,
  );
  const [selectedMintType, setSelectedMintType] = useState<MintTypes>(
    MintTypes.Single,
  );
  const { showToast } = useToast();
  const { isCurrentChainSupported } = useIsChainSupported();
  const { setOpen: setOpenSwitchChain } = useDialog(DialogType.SwitchChain);

  const {
    symbol,
    decimals,
    balance,
    isLoading: tokenInfoLoading,
  } = useTokenInfo();

  const {
    allowance,
    rawAllowance,
    isLoading: allowanceLoading,
    refetch: refetchAllowance,
  } = useTokenAllowance(
    address as `0x${string}`,
    YUMI_CONTRACT_ADDRESS as `0x${string}`,
  );

  const formatTokenAmount = (amount: bigint | undefined) => {
    if (!amount) return "0";

    const decimalPlaces = tokenDecimals ? Number(tokenDecimals) : 9;
    return formatUnits(amount, decimalPlaces);
  };

  const formattedSinglePrice = formatTokenAmount(singlePrice as bigint);
  const formattedDoublePrice = formatTokenAmount(doublePrice as bigint);
  const formattedBulkPrice = formatTokenAmount(bulkPrice as bigint);

  const getCurrentPrice = () => {
    switch (selectedMintType) {
      case MintTypes.Single:
        return singlePrice as bigint;
      case MintTypes.Double:
        return doublePrice as bigint;
      case MintTypes.Bulk:
        return bulkPrice as bigint;
      default:
        return singlePrice as bigint;
    }
  };

  const getFormattedPrice = () => {
    switch (selectedMintType) {
      case MintTypes.Single:
        return formattedSinglePrice;
      case MintTypes.Double:
        return formattedDoublePrice;
      case MintTypes.Bulk:
        return formattedBulkPrice;
      default:
        return formattedSinglePrice;
    }
  };

  const getNFTCount = () => {
    switch (selectedMintType) {
      case MintTypes.Single:
        return 1;
      case MintTypes.Double:
        return 2;
      case MintTypes.Bulk:
        return 3;
      default:
        return 1;
    }
  };

  const isPriceFetched =
    !singlePriceLoading &&
    !doublePriceLoading &&
    !bulkPriceLoading &&
    (singlePrice as string) &&
    (doublePrice as string) &&
    (bulkPrice as string);

  const hasEnoughTokens =
    balance && getFormattedPrice()
      ? parseFloat(balance) >= parseFloat(getFormattedPrice())
      : false;

  const handleApproveAndMint = async () => {
    setIsMinting(true);
    const isPriceFetched =
      !singlePriceLoading &&
      !doublePriceLoading &&
      !bulkPriceLoading &&
      (singlePrice as string) &&
      (doublePrice as string) &&
      (bulkPrice as string);
    const mintTo = recipient || (address as `0x${string}`);
    const currentPrice = getCurrentPrice();

    if (!isPriceFetched) {
      console.error("Price is not yet fetched");
      showToast("Price is not yet fetched", "error");
      setIsMinting(false);
      return;
    }

    try {
      const readableAmount = formatTokenAmount(currentPrice);
      showToast(`Approving ${readableAmount} ${symbol} for minting...`, "info");

      const hash = await writeContract(wagmiConfig, {
        abi: erc20Abi,
        address: YUMI_TOKEN_ADDRESS,
        chainId: monadTestnet.id,
        functionName: "approve",
        args: [YUMI_CONTRACT_ADDRESS, currentPrice],
      });

      const { status } = await waitForTransactionReceipt(wagmiConfig, {
        hash,
      });

      if (status === "success") {
        showToast("Token approval successful", "success");

        const hash = await writeContract(wagmiConfig, {
          abi: yumiABI,
          chainId: monadTestnet.id,
          address: YUMI_CONTRACT_ADDRESS,
          functionName: "mint",
          args: [mintTo, selectedMintType],
        });

        const { status } = await waitForTransactionReceipt(wagmiConfig, {
          hash,
        });

        if (status === "success") {
          showToast(`${getNFTCount()} NFT(s) minted successfully`, "success");
        }
      }
    } catch (err) {
      console.error("Error Minting NFT:", err);
      showToast("Error Minting NFT, Please try again", "error");
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="yumi-card p-6" id="mint">
      <h2 className="text-2xl font-semibold text-[#00ff9d] mb-4">
        Mint New NFT
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div
          className={`bg-[#1a1a2e] p-4 rounded-lg border ${selectedMintType === MintTypes.Single ? "border-[#9333ea]" : "border-[#00ff9d]/30"} cursor-pointer transition-all hover:border-[#9333ea]`}
          onClick={() => setSelectedMintType(MintTypes.Single)}
        >
          <h3 className="text-white font-medium mb-2">Single Mint</h3>
          <p className="text-[#00ff9d] text-xl font-bold mb-1">
            {singlePriceLoading
              ? "Loading..."
              : `${formattedSinglePrice} ${symbol}`}
          </p>
          <p className="text-gray-400 text-sm">Get 1 YUMI NFT</p>
          {selectedMintType === MintTypes.Single && (
            <div className="mt-2 bg-[#9333ea]/20 p-2 rounded">
              <p className="text-white text-xs text-center">Selected</p>
            </div>
          )}
        </div>

        <div
          className={`bg-[#1a1a2e] p-4 rounded-lg border ${selectedMintType === MintTypes.Double ? "border-[#9333ea]" : "border-[#00ff9d]/30"} cursor-pointer transition-all hover:border-[#9333ea]`}
          onClick={() => setSelectedMintType(MintTypes.Double)}
        >
          <h3 className="text-white font-medium mb-2">Double Mint</h3>
          <p className="text-[#00ff9d] text-xl font-bold mb-1">
            {doublePriceLoading
              ? "Loading..."
              : `${formattedDoublePrice} ${symbol}`}
          </p>
          <p className="text-gray-400 text-sm">Get 2 YUMI NFTs</p>
          {selectedMintType === MintTypes.Double && (
            <div className="mt-2 bg-[#9333ea]/20 p-2 rounded">
              <p className="text-white text-xs text-center">Selected</p>
            </div>
          )}
        </div>

        <div
          className={`bg-[#1a1a2e] p-4 rounded-lg border ${selectedMintType === MintTypes.Bulk ? "border-[#9333ea]" : "border-[#00ff9d]/30"} cursor-pointer transition-all hover:border-[#9333ea]`}
          onClick={() => setSelectedMintType(MintTypes.Bulk)}
        >
          <h3 className="text-white font-medium mb-2">Bulk Mint</h3>
          <p className="text-[#00ff9d] text-xl font-bold mb-1">
            {bulkPriceLoading
              ? "Loading..."
              : `${formattedBulkPrice} ${symbol}`}
          </p>
          <p className="text-gray-400 text-sm">Get 3 YUMI NFTs</p>
          {selectedMintType === MintTypes.Bulk && (
            <div className="mt-2 bg-[#9333ea]/20 p-2 rounded">
              <p className="text-white text-xs text-center">Selected</p>
            </div>
          )}
        </div>
      </div>

      <div className="mb-4 bg-[#1a1a2e] p-4 rounded-lg border border-[#00ff9d]/30">
        <p className="text-gray-400 text-sm mb-1">Your Token Balance</p>
        {tokenInfoLoading ? (
          <p className="text-white text-xl font-medium">Loading balance...</p>
        ) : (
          <p
            className={`text-white text-xl font-medium ${!hasEnoughTokens && isPriceFetched ? "text-[#ef4444]" : ""}`}
          >
            {balance} {symbol}
          </p>
        )}
        {!hasEnoughTokens && isPriceFetched && (
          <p className="text-[#ef4444] text-sm mt-1">
            Insufficient balance to mint. You need {getFormattedPrice()}{" "}
            {symbol as string}.
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="recipient" className="block text-gray-300 mb-2">
          Recipient Address (optional):
        </label>
        <input
          id="recipient"
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value as `0x${string}`)}
          placeholder="Enter recipient address or leave empty for self"
          className="yumi-input w-full"
        />
      </div>

      {isCurrentChainSupported ? (
        <button
          disabled={isMinting || !hasEnoughTokens}
          onClick={handleApproveAndMint}
          className="yumi-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isMinting
            ? "Minting..."
            : `Approve and Mint ${getNFTCount()} NFT${getNFTCount() > 1 ? "s" : ""}`}
        </button>
      ) : (
        <button
          onClick={() => setOpenSwitchChain(true)}
          className="w-full bg-[#ef4444] hover:bg-[#ef4444]/80 text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Wrong Network Click Here to Switch
        </button>
      )}

      {!hasEnoughTokens && isPriceFetched && (
        <p className="text-[#ef4444] text-sm mt-4">
          Insufficient balance to mint. You need {getFormattedPrice()}{" "}
          {symbol as string}.
        </p>
      )}
    </div>
  );
}

export default MintNFT;
