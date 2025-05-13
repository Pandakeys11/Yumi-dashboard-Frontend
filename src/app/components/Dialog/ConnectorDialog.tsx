import { FC, useCallback, useMemo, useState } from "react";
import CircularLoader from "../CircularLoader";
import { useConnect } from "wagmi";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogType,
  useDialog,
} from "./dialog";
import { useToast } from "../Toast/ToastProvider";
import { Icons } from "@/app/lib/utils/dialog/constant";

const ConnectorDialog: FC = () => {
  const { connectors, isPending, connectAsync } = useConnect();
  const [pendingConnectorId, setPendingConnectorId] = useState("");
  const { open, setOpen } = useDialog(DialogType.Connector);
  const { showToast } = useToast();

  const onSelect = useCallback(
    async (connectorId: string) => {
      try {
        const connector = connectors.find((el) => el.id === connectorId);
        if (!connector) throw new Error("Connector not found");
        await connectAsync({ connector });
      } catch (error: any) {
        console.error(error);
        showToast(error.message || error, "error");
      } finally {
        setOpen(false);
      }
    },
    [connectAsync, connectors, setOpen, showToast],
  );

  const _connectors = useMemo(() => {
    const conns = [...connectors];
    const injected = conns.find((el) => el.id === "injected");
    if (injected) {
      return [
        injected,
        ...conns.filter(
          (el) => el.id !== "injected" && el.name !== injected.name,
        ),
      ];
    }
    return conns;
  }, [connectors]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="yumi-card">
        <DialogHeader>
          <DialogTitle className="text-4xl text-accent-main">
            Connect Your Wallet
          </DialogTitle>
          <DialogDescription className="text-2xl text-text-secondary">
            Please select a wallet to connect.
          </DialogDescription>
        </DialogHeader>
        <div className="modal-body">
          {_connectors.map((connector) => {
            const iconSrc =
              connector.name in Icons ? Icons[connector.name] : Icons.Injected;

            return (
              <div
                onClick={() => {
                  onSelect(connector.id);
                  setPendingConnectorId(connector.id);
                }}
                key={connector.id}
                className="flex justify-between items-center border border-accent-main/30 my-2 cursor-pointer p-4 rounded-lg hover:bg-background-light transition-colors"
              >
                <h4 className="text-3xl text-text-primary">{connector.name}</h4>
                {isPending && connector.id === pendingConnectorId ? (
                  <CircularLoader
                    text="Connecting..."
                    loaderColor="bg-accent-main"
                    textColor="text-text-primary"
                  />
                ) : (
                  <Image
                    src={iconSrc}
                    alt={connector.name}
                    width={40}
                    height={40}
                  />
                )}
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectorDialog;
