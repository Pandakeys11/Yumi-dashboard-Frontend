import { useAccount } from "wagmi";
import {
  useNFTPrice,
  useDoubleMintPrice,
  useBulkMintPrice,
  useFundsCollected,
  useBalanceOf,
  useTotalSupply,
  useFundToken,
  useTotalFundsRaised,
  useTotalFundsWithdrawn,
} from "../../hooks/useNftReadMethods";
import { formatUnits } from "viem";
import { useTokenInfo, useTokenDecimals } from "../../hooks/useYumiToken";

function NFTInfo() {
  const { address } = useAccount();
  const { data: singlePrice, isLoading: singlePriceLoading } = useNFTPrice();
  const { data: doublePrice, isLoading: doublePriceLoading } =
    useDoubleMintPrice();
  const { data: bulkPrice, isLoading: bulkPriceLoading } = useBulkMintPrice();
  const { data: tokenAddress, isLoading: tokenAddressLoading } = useFundToken();
  const { fundsCollected, isLoading: fundsLoading } = useFundsCollected();
  const { totalFundsRaised, isLoading: raisedLoading } = useTotalFundsRaised();
  const { totalFundsWithdrawn, isLoading: withdrawnLoading } =
    useTotalFundsWithdrawn();
  const { data: nftBalance, isLoading: balanceLoading } = useBalanceOf(
    address as `0x${string}`,
  );
  const { totalSupply, isLoading: supplyLoading } = useTotalSupply();
  const {
    name,
    symbol,
    decimals,
    isLoading: tokenInfoLoading,
  } = useTokenInfo();
  const { data: tokenDecimals, isLoading: isDecimalsLoading } =
    useTokenDecimals();

  const formatTokenAmount = (amount: bigint | undefined) => {
    if (!amount) return "0";
    const decimalPlaces = Number(tokenDecimals || 9);
    return formatUnits(amount, decimalPlaces);
  };

  const calculateSavings = (
    singlePrice: bigint | undefined,
    bundlePrice: bigint | undefined,
    count: number,
  ): string => {
    if (!singlePrice || !bundlePrice) return "0";
    const singleTotal = singlePrice * BigInt(count);
    const savings = singleTotal - bundlePrice;
    return formatUnits(savings, Number(tokenDecimals || 9));
  };

  if (
    singlePriceLoading ||
    doublePriceLoading ||
    bulkPriceLoading ||
    fundsLoading ||
    balanceLoading ||
    supplyLoading ||
    tokenAddressLoading ||
    raisedLoading ||
    withdrawnLoading ||
    tokenInfoLoading ||
    isDecimalsLoading
  ) {
    return (
      <div className="w-full h-40 flex items-center justify-center text-gray-300">
        Loading NFT information...
      </div>
    );
  }

  const formattedSinglePrice = formatTokenAmount(singlePrice as bigint);
  const formattedDoublePrice = formatTokenAmount(doublePrice as bigint);
  const formattedBulkPrice = formatTokenAmount(bulkPrice as bigint);

  return (
    <div className="yumi-card p-6">
      <h2 className="text-2xl font-semibold text-[#00ff9d] mb-4">
        YUMI NFT Information
      </h2>

      <div className="mb-6">
        <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#00ff9d]/30">
          <h3 className="text-lg font-medium text-white mb-3">
            NFT Pricing Tiers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#0a0a1a] p-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-400 text-sm">Single Mint</p>
                <span className="bg-[#9333ea]/30 text-white text-xs px-2 py-1 rounded">
                  1 NFT
                </span>
              </div>
              <p className="text-white text-xl font-medium">
                {formattedSinglePrice} {symbol || "YUMI"}
              </p>
              <p className="text-gray-400 text-xs mt-1">
                {formattedSinglePrice === "1000"
                  ? "Regular price"
                  : `${formattedSinglePrice} ${symbol} per NFT`}
              </p>
            </div>

            <div className="bg-[#0a0a1a] p-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-400 text-sm">Double Mint</p>
                <span className="bg-[#9333ea]/30 text-white text-xs px-2 py-1 rounded">
                  2 NFTs
                </span>
              </div>
              <p className="text-white text-xl font-medium">
                {formattedDoublePrice} {symbol || "YUMI"}
              </p>
              {!!(singlePrice && doublePrice) && (
                <p className="text-[#00ff9d] text-xs mt-1">
                  Save{" "}
                  {calculateSavings(
                    singlePrice as bigint,
                    doublePrice as bigint,
                    2,
                  )}{" "}
                  {symbol}
                </p>
              )}
            </div>

            <div className="bg-[#0a0a1a] p-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-400 text-sm">Bulk Mint</p>
                <span className="bg-[#9333ea]/30 text-white text-xs px-2 py-1 rounded">
                  3 NFTs
                </span>
              </div>
              <p className="text-white text-xl font-medium">
                {formattedBulkPrice} {symbol || "YUMI"}
              </p>
              {!!(singlePrice && bulkPrice) && (
                <p className="text-[#00ff9d] text-xs mt-1">
                  Save{" "}
                  {calculateSavings(
                    singlePrice as bigint,
                    bulkPrice as bigint,
                    3,
                  )}{" "}
                  {symbol}
                </p>
              )}
            </div>
          </div>
          <p className="text-gray-400 text-xs mt-3">
            Token: {(tokenAddress as `0x${string}`)?.slice(0, 6)}...
            {(tokenAddress as `0x${string}`)?.slice(-4)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#00ff9d]/30">
          <p className="text-gray-400 text-sm mb-1">Current Funds</p>
          <p className="text-white text-xl font-medium">
            {fundsCollected} {symbol || "YUMI"}
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Total Raised: {totalFundsRaised} {symbol || "YUMI"}
          </p>
        </div>
        <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#00ff9d]/30">
          <p className="text-gray-400 text-sm mb-1">Your NFT Balance</p>
          <p className="text-white text-xl font-medium">
            {nftBalance?.toString() || "0"}
          </p>
        </div>
        <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#00ff9d]/30">
          <p className="text-gray-400 text-sm mb-1">Total NFTs Minted</p>
          <p className="text-white text-xl font-medium">{totalSupply}</p>
          <p className="text-gray-400 text-xs mt-1">Max Supply: 4,000 NFTs</p>
        </div>
      </div>
    </div>
  );
}

export default NFTInfo;
