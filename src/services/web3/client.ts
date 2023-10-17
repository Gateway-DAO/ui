import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { createClient, configureChains } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, goerli } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';

// const alchemyId = process.env.ALCHEMY_ID

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
export const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, polygon, optimism, arbitrum, goerli],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY })]
);

const { connectors } = getDefaultWallets({
  appName: 'Odyssey',
  chains,
});

export const web3client = createClient({
  autoConnect: false,
  connectors,
  provider,
  webSocketProvider,
});
