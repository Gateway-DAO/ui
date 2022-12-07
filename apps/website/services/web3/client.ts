import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { createClient, chain, configureChains } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

// const alchemyId = process.env.ALCHEMY_ID

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
export const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum, chain.goerli],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY })]
);

const { connectors } = getDefaultWallets({
  appName: 'GatewayDAO',
  chains,
});

export const web3client = (autoConnect = false) =>
  createClient({
    autoConnect,
    connectors,
    provider,
    webSocketProvider,
  });
