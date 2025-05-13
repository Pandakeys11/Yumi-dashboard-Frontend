import { useReadContract, useReadContracts } from "wagmi";
import { Address, formatUnits, Abi } from "viem";
import { yumiABI, YUMI_CONTRACT_ADDRESS } from "../lib/utils/contract";
import { monadTestnet } from "../lib/utils/constant";
import { useTokenDecimals } from "./useYumiToken";

export function useNFTPrice() {
  return useReadContract({
    abi: yumiABI,
    chainId: monadTestnet.id,
    address: YUMI_CONTRACT_ADDRESS,
    functionName: "singleMintPrice",
  });
}

export function useDoubleMintPrice() {
  return useReadContract({
    abi: yumiABI,
    chainId: monadTestnet.id,
    address: YUMI_CONTRACT_ADDRESS,
    functionName: "doubleMintPrice",
  });
}

export function useBulkMintPrice() {
  return useReadContract({
    abi: yumiABI,
    chainId: monadTestnet.id,
    address: YUMI_CONTRACT_ADDRESS,
    functionName: "bulkMintPrice",
  });
}

export function useFundToken() {
  return useReadContract({
    abi: yumiABI,
    chainId: monadTestnet.id,
    address: YUMI_CONTRACT_ADDRESS,
    functionName: "yumiToken",
  });
}

export function useBalanceOfToken() {
  const { data, isError, isLoading, refetch } = useReadContract({
    abi: yumiABI,
    chainId: monadTestnet.id,
    address: YUMI_CONTRACT_ADDRESS,
    functionName: "balanceOfToken",
  });

  const { data: decimals, isLoading: isDecimalsLoading } = useTokenDecimals();

  return {
    tokenBalance:
      data && decimals ? formatUnits(data as bigint, Number(decimals)) : "0",
    rawTokenBalance: data as bigint,
    isError,
    isLoading: isLoading || isDecimalsLoading,
    refetch,
  };
}

export function useTotalFundsRaised() {
  const { data, isError, isLoading, refetch } = useReadContract({
    abi: yumiABI,
    chainId: monadTestnet.id,
    address: YUMI_CONTRACT_ADDRESS,
    functionName: "totalFundsRaised",
  });

  const { data: decimals, isLoading: isDecimalsLoading } = useTokenDecimals();

  return {
    totalFundsRaised:
      data && decimals ? formatUnits(data as bigint, Number(decimals)) : "0",
    rawTotalFundsRaised: data as bigint,
    isError,
    isLoading: isLoading || isDecimalsLoading,
    refetch,
  };
}

export function useTotalFundsWithdrawn() {
  const { data, isError, isLoading, refetch } = useReadContract({
    abi: yumiABI,
    chainId: monadTestnet.id,
    address: YUMI_CONTRACT_ADDRESS,
    functionName: "totalFundsWithdrawn",
  });

  const { data: decimals, isLoading: isDecimalsLoading } = useTokenDecimals();

  return {
    totalFundsWithdrawn:
      data && decimals ? formatUnits(data as bigint, Number(decimals)) : "0",
    rawTotalFundsWithdrawn: data as bigint,
    isError,
    isLoading: isLoading || isDecimalsLoading,
    refetch,
  };
}

// For backward compatibility with existing components
export function useFundsCollected() {
  const { tokenBalance, isError, isLoading, refetch } = useBalanceOfToken();

  return {
    fundsCollected: tokenBalance,
    isError,
    isLoading,
    refetch,
  };
}

export function useOwnerCollection(ownerAddress: Address) {
  return useReadContract({
    abi: yumiABI,
    chainId: monadTestnet.id,
    address: YUMI_CONTRACT_ADDRESS,
    functionName: "ownerCollection",
    args: [ownerAddress],
    query: {
      enabled: !!ownerAddress,
    },
  });
}

export function useBalanceOf(address: Address) {
  return useReadContract({
    abi: yumiABI,
    chainId: monadTestnet.id,
    address: YUMI_CONTRACT_ADDRESS,
    functionName: "balanceOf",
    args: [address],
    query: {
      enabled: !!address,
    },
  });
}

export function useOwnerOf(tokenId: bigint) {
  return useReadContract({
    abi: yumiABI,
    chainId: monadTestnet.id,
    address: YUMI_CONTRACT_ADDRESS,
    functionName: "ownerOf",
    args: [tokenId],
    query: {
      enabled: !!tokenId,
    },
  });
}

export function useTokenURI(tokenId: bigint) {
  return useReadContract({
    abi: yumiABI,
    chainId: monadTestnet.id,
    address: YUMI_CONTRACT_ADDRESS,
    functionName: "tokenURI",
    args: [tokenId],
    query: {
      enabled: !!tokenId,
    },
  });
}

export function useTotalSupply() {
  const { data, isError, isLoading, error } = useReadContract({
    abi: yumiABI,
    chainId: monadTestnet.id,
    address: YUMI_CONTRACT_ADDRESS,
    functionName: "totalSupply",
  });

  return {
    totalSupply: data ? (data as bigint).toString() : "0",
    isError,
    isLoading,
    error,
  };
}

export function useTokenOfOwnerByIndex(owner: Address, index: bigint) {
  return useReadContract({
    abi: yumiABI,
    chainId: monadTestnet.id,
    address: YUMI_CONTRACT_ADDRESS,
    functionName: "tokenOfOwnerByIndex",
    args: [owner, index],
    query: {
      enabled: !!owner && index !== undefined,
    },
  });
}

export function useSupportsInterface(interfaceId: Address) {
  return useReadContract({
    abi: yumiABI,
    chainId: monadTestnet.id,
    address: YUMI_CONTRACT_ADDRESS,
    functionName: "supportsInterface",
    args: [interfaceId],
    query: {
      enabled: !!interfaceId,
    },
  });
}

export function useUserNFTDetails(userAddress: Address, tokenIds: bigint[]) {
  type ContractConfig = {
    address: `0x${string}`;
    abi: Abi;
    functionName: string;
    args: readonly [bigint];
  };

  const contractConfigs: ContractConfig[] =
    tokenIds?.map((tokenId) => ({
      abi: yumiABI as Abi,
      chainId: monadTestnet.id,
      address: YUMI_CONTRACT_ADDRESS as `0x${string}`,
      functionName: "tokenURI",
      args: [tokenId] as readonly [bigint],
    })) || [];

  return useReadContracts({
    contracts: contractConfigs,
    query: {
      enabled: !!userAddress && tokenIds?.length > 0,
    },
  });
}

export function useMintTypes() {
  return useReadContract({
    abi: yumiABI,
    chainId: monadTestnet.id,
    address: YUMI_CONTRACT_ADDRESS,
    functionName: "getMintTypes",
  });
}

export function useMintTypeNames() {
  return useReadContract({
    abi: yumiABI,
    chainId: monadTestnet.id,
    address: YUMI_CONTRACT_ADDRESS,
    functionName: "getMintTypeNames",
  });
}
