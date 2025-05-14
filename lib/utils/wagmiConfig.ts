import { QueryClient } from "@tanstack/react-query";
import { createClient } from "viem";
import { createConfig, http } from "wagmi";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";
import { mainnet, sepolia, bsc } from "wagmi/chains";
import { createConnector } from "wagmi";
import { HiChevronDoubleDown } from "react-icons/hi";
import MetaMaskIcon from "../../../../public/chainWalletIcon/MetaMask.svg";
import { monadTestnet } from "./constant";

const WALLET_CONNECT_PROJECT_ID = process.env
  .NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string;

function injectedWithFallback() {
  return createConnector((config) => {
    const injectedConnector = injected()(config);

    return {
      ...injectedConnector,
      connect(...params) {
        if (typeof window !== "undefined" && !window.ethereum) {
          window.open("https://metamask.io/", "inst_metamask");
        }
        return injectedConnector.connect(...params);
      },
      get icon() {
        if (typeof window !== "undefined") {
          return !window.ethereum || window.ethereum?.isMetaMask
            ? MetaMaskIcon
            : HiChevronDoubleDown;
        }
        return HiChevronDoubleDown;
      },
      get name() {
        if (typeof window !== "undefined") {
          return !window.ethereum
            ? "Install MetaMask"
            : window.ethereum?.isMetaMask
              ? "MetaMask"
              : "Browser Wallet";
        }
        return "Browser Wallet";
      },
    };
  });
}

export const WC_PARAMS = {
  projectId: WALLET_CONNECT_PROJECT_ID,
  metadata: {
    name: "$YUMI NFT",
    description: "$YUMI NFT",
    url: "https://www.Yumi.com/",
    icons: [""],
  },
  qrModalOptions: {
    themeVariables: {
      "--wcm-font-family": '"Jersey 10", sans-serif',
      "--wcm-z-index": "1060",
    },
  },
};

export const wagmiConfig = createConfig({
  chains: [monadTestnet],
  connectors: [
    injectedWithFallback(),
    walletConnect(WC_PARAMS),
    coinbaseWallet({
      appName: "$YUMI NFT",
      reloadOnDisconnect: false,
    }),
  ],
  client({ chain }) {
    return createClient({
      chain,
      pollingInterval: 12_000,
      transport: http(),
    });
  },
  ssr: true,
});

export const queryClient = new QueryClient();

declare module "wagmi" {
  // @ts-ignore
  interface Register {
    config: typeof wagmiConfig;
  }
}
