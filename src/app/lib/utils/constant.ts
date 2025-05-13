import { defineChain } from "viem";

export const monadTestnet = defineChain({
  id: 10143,
  name: "Monad Testnet",
  nativeCurrency: { name: "Monad", symbol: "MON", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.monad.xyz/"],
    },
  },
  blockExplorers: {
    default: {
      name: "Monad Testnet Blockscout",
      url: "https://testnet.monadexplorer.com/",
    },
  },
});

// Admin settings
export const ADMIN_PASSWORD = "yumi2025@admin";
export const ADMIN_WALLET_ADDRESS =
  "0x0E816E3E3a08dA027ED0f5D74965CCE3b43a1C8d";
