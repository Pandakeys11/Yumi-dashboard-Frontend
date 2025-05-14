import { useAccount, useConfig } from "wagmi";
import { monadTestnet } from "../constant";

const useIsChainSupported = () => {
  const { chainId } = useAccount();
  const { chains: wagmiChains } = useConfig();
  const chain = wagmiChains.find((chain) => chain.id === chainId);
  const isCurrentChainSupported = chainId === monadTestnet.id;

  return { isCurrentChainSupported, chainId, chain };
};

export default useIsChainSupported;
