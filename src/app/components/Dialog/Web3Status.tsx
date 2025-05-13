import React, { FC, useMemo, useState } from "react";
import { WalletButton } from "../Button/ButtonWallet";
import { useAccount, useDisconnect } from "wagmi";
import { cn, shortenHash } from "@/app/lib/utils/helpers";
import { DialogType, useDialog } from "./dialog";
import useIsChainSupported from "@/app/lib/utils/hooks/useIsChainSupported";
import { MdContentCopy, MdCheck, MdPowerOff } from "react-icons/md";
import { ButtonSecondary } from "../Button";
import { useBalance } from "wagmi";
import { monadTestnet } from "@/app/lib/utils/constant";
import { formatUnits } from "viem";

export const Web3Status = ({ className }: { className?: string }) => {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address: address,
    chainId: monadTestnet.id,
  });
  const { disconnect } = useDisconnect();
  const { isCurrentChainSupported } = useIsChainSupported();
  const { setOpen: setOpenSwitchChain } = useDialog(DialogType.SwitchChain);
  const { setOpen: setOpenConnector } = useDialog(DialogType.Connector);
  const [isCopying, setIsCopying] = useState(false);

  const useMemoBalance = useMemo(() => {
    return formatUnits(balance?.value || BigInt(0), 18);
  }, [balance]);

  return (
    <div>
      {!isConnected && (
        <WalletButton
          size="small"
          className="!w-full"
          onClick={() => setOpenConnector(true)}
        >
          Connect Wallet
        </WalletButton>
      )}
      {isConnected && address && (
        <>
          {isCurrentChainSupported ? (
            <div className={cn("flex items-center gap-2", className)}>
              <ButtonSecondary
                size="small"
                className="flex items-center gap-2 whitespace-nowrap rounded-md px-2 py-1 h-full"
              >
                {useMemoBalance} {balance?.symbol}
              </ButtonSecondary>
              <ButtonSecondary
                size="small"
                className="w-full"
                onClick={() => {
                  navigator.clipboard.writeText(address);
                  setIsCopying(true);
                  setTimeout(() => {
                    setIsCopying(false);
                  }, 2000);
                }}
              >
                {shortenHash(address)}
                {isCopying ? (
                  <MdCheck className="ml-2" />
                ) : (
                  <MdContentCopy className="ml-2" />
                )}
              </ButtonSecondary>
              <ButtonSecondary
                size="small"
                className="w-full"
                onClick={() => {
                  disconnect();
                }}
              >
                <MdPowerOff />
              </ButtonSecondary>
            </div>
          ) : (
            <>
              <WalletButton
                size="small"
                onClick={() => setOpenSwitchChain(true)}
              >
                Wrong network
              </WalletButton>
            </>
          )}
        </>
      )}
    </div>
  );
};
