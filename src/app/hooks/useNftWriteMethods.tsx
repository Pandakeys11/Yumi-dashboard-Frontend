import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
  useReadContract,
} from "wagmi";
import { Address, erc20Abi, parseUnits } from "viem";
import { yumiABI, YUMI_CONTRACT_ADDRESS } from "../lib/utils/contract";
import { monadTestnet } from "../lib/utils/constant";
import { useToast } from "../components/Toast/ToastProvider";
import { DialogType, useDialog } from "../components/Dialog/dialog";
import { useFundToken } from "./useNftReadMethods";
import { useTokenDecimals } from "./useYumiToken";

// MintTypes enum matching the smart contract
export enum MintTypes {
  Single = 0,
  Double = 1,
  Bulk = 2,
}

export function useApproveToken(tokenAddress: Address) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();
  const { data: decimals, isLoading: isDecimalsLoading } = useTokenDecimals();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const approve = async (amount: string) => {
    if (!tokenAddress) {
      console.error("Token address is required");
      return;
    }

    try {
      const tokenDecimals = Number(decimals || 9);
      const amountInTokenUnits = parseUnits(amount, tokenDecimals);

      await writeContract({
        abi: erc20Abi,
        address: tokenAddress,
        functionName: "approve",
        args: [YUMI_CONTRACT_ADDRESS, amountInTokenUnits],
      });
    } catch (err) {
      console.error("Token approval error:", err);
    }
  };

  return {
    approve,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
    isDecimalsLoading,
  };
}

export function useCheckAllowance(owner: Address, tokenAddress: Address) {
  return useReadContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: "allowance",
    args: [owner, YUMI_CONTRACT_ADDRESS],
    query: {
      enabled: !!owner && !!tokenAddress,
    },
  });
}

export function useMintNFT() {
  const { data: hash, isPending, writeContract, error } = useWriteContract();
  const { chainId } = useAccount();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });
  const { open, setOpen } = useDialog(DialogType.SwitchChain);
  const { showToast } = useToast();

  const mint = async (
    recipientAddress: Address,
    mintType: MintTypes = MintTypes.Single,
  ) => {
    if (!recipientAddress) {
      console.error("Recipient address is required");
      return;
    }
    if (chainId !== monadTestnet.id) {
      console.error("Chain ID is not supported");
      showToast("Chain ID is not supported", "error");
      setOpen(true);
      return;
    }
    try {
      await writeContract({
        abi: yumiABI,
        chainId: monadTestnet.id,
        address: YUMI_CONTRACT_ADDRESS,
        functionName: "mint",
        args: [recipientAddress, mintType],
      });
    } catch (err) {
      console.error("Mint error:", err);
    }
  };

  return {
    mint,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}

export function useTransferNFT() {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const transfer = async (to: Address, tokenId: bigint) => {
    if (!to) {
      console.error("Recipient address is required");
      return;
    }

    if (!tokenId) {
      console.error("Token ID is required");
      return;
    }

    try {
      await writeContract({
        abi: yumiABI,
        chainId: monadTestnet.id,
        address: YUMI_CONTRACT_ADDRESS,
        functionName: "transfer",
        args: [to, tokenId],
      });
    } catch (err) {
      console.error("Transfer error:", err);
    }
  };

  return {
    transfer,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}

export function useWithdrawFunds() {
  const { data: hash, isPending, writeContract, error } = useWriteContract();
  const { data: decimals, isLoading: isDecimalsLoading } = useTokenDecimals();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const withdrawFunds = async (amount?: string) => {
    try {
      if (amount) {
        const tokenDecimals = Number(decimals || 9);
        const amountInTokenUnits = parseUnits(amount, tokenDecimals);

        await writeContract({
          abi: yumiABI,
          chainId: monadTestnet.id,
          address: YUMI_CONTRACT_ADDRESS,
          functionName: "withdrawFunds",
          args: [amountInTokenUnits],
        });
      } else {
        await writeContract({
          abi: yumiABI,
          chainId: monadTestnet.id,
          address: YUMI_CONTRACT_ADDRESS,
          functionName: "withdrawAllFunds",
        });
      }
    } catch (err) {
      console.error("Withdraw error:", err);
    }
  };

  return {
    withdrawFunds,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}

export function useSetBaseURI() {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const setBaseURI = async (uri: string) => {
    if (!uri || uri.trim() === "") {
      console.error("URI cannot be empty");
      return;
    }

    try {
      await writeContract({
        abi: yumiABI,
        chainId: monadTestnet.id,
        address: YUMI_CONTRACT_ADDRESS,
        functionName: "setBaseURI",
        args: [uri],
      });
    } catch (err) {
      console.error("Set URI error:", err);
    }
  };

  return {
    setBaseURI,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}

export function useSetFundToken() {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const setFundToken = async (tokenAddress: Address) => {
    if (!tokenAddress) {
      console.error("Token address cannot be empty");
      return;
    }

    try {
      await writeContract({
        abi: yumiABI,
        chainId: monadTestnet.id,
        address: YUMI_CONTRACT_ADDRESS,
        functionName: "updateToken",
        args: [tokenAddress],
      });
    } catch (err) {
      console.error("Set fund token error:", err);
    }
  };

  return {
    setFundToken,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}

export function useUpdatePrices() {
  const { data: hash, isPending, writeContract, error } = useWriteContract();
  const { data: decimals, isLoading: isDecimalsLoading } = useTokenDecimals();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const updatePrices = async (
    singlePrice: string,
    doublePrice: string,
    bulkPrice: string,
  ) => {
    if (!singlePrice || !doublePrice || !bulkPrice) {
      console.error("All price parameters must be provided");
      return;
    }

    try {
      const tokenDecimals = Number(decimals || 9);
      const singlePriceInTokenUnits = parseUnits(singlePrice, tokenDecimals);
      const doublePriceInTokenUnits = parseUnits(doublePrice, tokenDecimals);
      const bulkPriceInTokenUnits = parseUnits(bulkPrice, tokenDecimals);

      await writeContract({
        abi: yumiABI,
        chainId: monadTestnet.id,
        address: YUMI_CONTRACT_ADDRESS,
        functionName: "updatePrices",
        args: [
          singlePriceInTokenUnits,
          doublePriceInTokenUnits,
          bulkPriceInTokenUnits,
        ],
      });
    } catch (err) {
      console.error("Update prices error:", err);
    }
  };

  return {
    updatePrices,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}
