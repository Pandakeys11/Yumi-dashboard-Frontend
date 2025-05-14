import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogType,
  useDialog,
} from "./dialog";
import { useAccount, useSwitchChain } from "wagmi";
import Image from "next/image";
import CircularLoader from "../CircularLoader";
import useIsChainSupported from "@/app/lib/utils/hooks/useIsChainSupported";
import { useToast } from "../Toast/ToastProvider";
import { monadTestnet } from "@/app/lib/utils/constant";
type ChainType = typeof monadTestnet.id;

const SwitchChainDialog = () => {
  const { open, setOpen } = useDialog(DialogType.SwitchChain);
  const { chains, isPending, switchChain } = useSwitchChain();
  const { chainId } = useAccount();
  const [pendingChainId, setPendingChainId] = useState<number>();
  const { isCurrentChainSupported } = useIsChainSupported();
  const { showToast } = useToast();

  useEffect(() => {
    if (open && chainId !== monadTestnet.id) {
      handleSwitchChain(monadTestnet.id);
    }
  }, [open, chainId]);

  const handleSwitchChain = (chainIdToSwitch: ChainType) => {
    try {
      if (chainId !== chainIdToSwitch) {
        setPendingChainId(chainIdToSwitch);
        switchChain({ chainId: chainIdToSwitch });
      }
    } catch (error: any) {
      console.error(error);
      showToast(error.shortMessage || error, "error");
    } finally {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="!text-4xl">Switch Networks</DialogTitle>
          {!isCurrentChainSupported && (
            <DialogDescription className="!text-2xl">
              Wrong network detected, switching to Monad Testnet...
            </DialogDescription>
          )}
        </DialogHeader>
        <div>
          {chains.map((chain) => {
            return (
              <div
                key={chain.id}
                onClick={() => handleSwitchChain(chain.id as ChainType)}
                className="flex justify-between items-center cursor-pointer border my-2 p-2"
              >
                <div className="flex space-x-2 items-center">
                  <Image
                    src={"/chainWalletIcon/Monad.svg"}
                    alt={`${chain.name}`}
                    width={30}
                    height={30}
                  />
                  <p>{chain.name}</p>
                </div>
                <div className="text-white">
                  {isPending && chain.id === pendingChainId ? (
                    <CircularLoader
                      text="Switching..."
                      loaderColor="bg-white"
                      textColor="text-white"
                    />
                  ) : chainId === chain.id ? (
                    <p>Connected</p>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SwitchChainDialog;
