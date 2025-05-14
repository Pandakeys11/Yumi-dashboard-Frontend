import { useReadContract, useAccount } from "wagmi";
import { erc20Abi, Address, formatUnits } from "viem";
import { monadTestnet } from "../lib/utils/constant";

export const YUMI_TOKEN_ADDRESS =
  "0x15C7079965B1639Bf4389010EedB33bC57eb96c7" as const;

// Hook to get token name
export function useTokenName() {
  return useReadContract({
    abi: erc20Abi,
    address: YUMI_TOKEN_ADDRESS,
    chainId: monadTestnet.id,
    functionName: "name",
  });
}

// Hook to get token symbol
export function useTokenSymbol() {
  return useReadContract({
    abi: erc20Abi,
    address: YUMI_TOKEN_ADDRESS,
    chainId: monadTestnet.id,
    functionName: "symbol",
  });
}

// Hook to get token decimals
export function useTokenDecimals() {
  return useReadContract({
    abi: erc20Abi,
    address: YUMI_TOKEN_ADDRESS,
    chainId: monadTestnet.id,
    functionName: "decimals",
  });
}

// Hook to get token total supply
export function useTokenTotalSupply() {
  const { data, isError, isLoading } = useReadContract({
    abi: erc20Abi,
    address: YUMI_TOKEN_ADDRESS,
    chainId: monadTestnet.id,
    functionName: "totalSupply",
  });

  // Get token decimals to format the total supply
  const { data: decimals, isLoading: isDecimalsLoading } = useTokenDecimals();

  return {
    totalSupply:
      data && decimals ? formatUnits(data as bigint, Number(decimals)) : "0",
    rawTotalSupply: data as bigint,
    isError,
    isLoading: isLoading || isDecimalsLoading,
  };
}

// Hook to get token balance for a specific address (or connected user)
export function useTokenBalance(address?: Address) {
  const { address: connectedAddress } = useAccount();
  const targetAddress = address || (connectedAddress as Address);

  const { data, isError, isLoading, refetch } = useReadContract({
    abi: erc20Abi,
    address: YUMI_TOKEN_ADDRESS,
    chainId: monadTestnet.id,
    functionName: "balanceOf",
    args: [targetAddress],
    query: {
      enabled: !!targetAddress,
    },
  });

  // Get token decimals to format the balance
  const { data: decimals, isLoading: isDecimalsLoading } = useTokenDecimals();

  return {
    balance:
      data && decimals ? formatUnits(data as bigint, Number(decimals)) : "0",
    rawBalance: data as bigint,
    isError,
    isLoading: isLoading || isDecimalsLoading,
    refetch,
  };
}

// Hook to get allowance for spender
export function useTokenAllowance(owner: Address, spender: Address) {
  const { data, isError, isLoading, refetch } = useReadContract({
    abi: erc20Abi,
    address: YUMI_TOKEN_ADDRESS,
    chainId: monadTestnet.id,
    functionName: "allowance",
    args: [owner, spender],
    query: {
      enabled: !!owner && !!spender,
    },
  });

  // Get token decimals to format the allowance
  const { data: decimals, isLoading: isDecimalsLoading } = useTokenDecimals();

  return {
    allowance:
      data && decimals ? formatUnits(data as bigint, Number(decimals)) : "0",
    rawAllowance: data as bigint,
    isError,
    isLoading: isLoading || isDecimalsLoading,
    refetch,
  };
}

// Hook to get all token information in one call
export function useTokenInfo() {
  const { data: name, isLoading: isNameLoading } = useTokenName();
  const { data: symbol, isLoading: isSymbolLoading } = useTokenSymbol();
  const { data: decimals, isLoading: isDecimalsLoading } = useTokenDecimals();
  const { totalSupply, isLoading: isSupplyLoading } = useTokenTotalSupply();
  const { address } = useAccount();
  const { balance, isLoading: isBalanceLoading } = useTokenBalance(
    address as Address,
  );

  return {
    name: (name as string) || "Yumi",
    symbol: (symbol as string) || "YUMI",
    decimals: (decimals as number) || 9,
    totalSupply,
    balance,
    isLoading:
      isNameLoading ||
      isSymbolLoading ||
      isDecimalsLoading ||
      isSupplyLoading ||
      isBalanceLoading,
  };
}
