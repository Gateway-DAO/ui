import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { createClient, chain, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

// const alchemyId = process.env.ALCHEMY_ID

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
export const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [
    // alchemyProvider({ alchemyId }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'GatewayDAO',
  chains,
});

export const web3client = createClient({
  autoConnect: false,
  connectors,
  provider,
  webSocketProvider,
});
