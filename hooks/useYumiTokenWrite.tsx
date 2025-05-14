import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { erc20Abi, Address, parseUnits } from "viem";
import { YUMI_TOKEN_ADDRESS, useTokenDecimals } from "./useYumiToken";
import { YUMI_CONTRACT_ADDRESS } from "../lib/utils/contract";
import { monadTestnet } from "../lib/utils/constant";
import { useToast } from "../components/Toast/ToastProvider";

// Hook for approving token spending
export function useApproveTokenSpending() {
  const { data: hash, isPending, writeContract, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });
  const { data: decimals, isLoading: isDecimalsLoading } = useTokenDecimals();
  const { showToast } = useToast();

  const approve = async (
    amount: string,
    spender: Address = YUMI_CONTRACT_ADDRESS,
  ) => {
    try {
      const tokenDecimals = Number(decimals || 9);
      const amountInTokenUnits = parseUnits(amount, tokenDecimals);

      await writeContract({
        abi: erc20Abi,
        address: YUMI_TOKEN_ADDRESS,
        chainId: monadTestnet.id,
        functionName: "approve",
        args: [spender, amountInTokenUnits],
      });
    } catch (err) {
      console.error("Token approval error:", err);
      showToast("Failed to approve token spending", "error");
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

// Hook for transferring tokens
export function useTransferToken() {
  const { data: hash, isPending, writeContract, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });
  const { data: decimals, isLoading: isDecimalsLoading } = useTokenDecimals();
  const { showToast } = useToast();

  const transfer = async (to: Address, amount: string) => {
    try {
      const tokenDecimals = Number(decimals || 9);
      const amountInTokenUnits = parseUnits(amount, tokenDecimals);

      await writeContract({
        abi: erc20Abi,
        address: YUMI_TOKEN_ADDRESS,
        chainId: monadTestnet.id,
        functionName: "transfer",
        args: [to, amountInTokenUnits],
      });
    } catch (err) {
      console.error("Token transfer error:", err);
      showToast("Failed to transfer tokens", "error");
    }
  };

  return {
    transfer,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
    isDecimalsLoading,
  };
}
