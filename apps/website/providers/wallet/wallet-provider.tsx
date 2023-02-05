import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

import {
  RainbowKitProvider,
  darkTheme as DarkTheme,
  Theme,
} from '@rainbow-me/rainbowkit';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  GlowWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { WagmiConfig } from 'wagmi';

import { brandColors } from '@gateway/theme';

import { chains, web3client } from '../../services/web3/client';

const darkTheme = DarkTheme({
  overlayBlur: 'small',
  accentColor: brandColors.purple.main,
});

const theme: Theme = {
  ...darkTheme,
  colors: {
    ...darkTheme.colors,
    modalBackground: brandColors.background.light,
  },
};

export function WalletProvider({ children }) {
  const session = useSession();

  const solNetwork = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);
  // initialise all the wallets you want to use
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network: solNetwork }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletExtensionWalletAdapter(),
      new SolletWalletAdapter(),
    ],
    [solNetwork]
  );

  return (
    <WagmiConfig client={web3client(!!session)}>
      <RainbowKitProvider
        chains={chains}
        modalSize="compact"
        theme={theme}
        appInfo={{
          appName: 'Gateway DAO',
        }}
      >
        <ConnectionProvider endpoint={endpoint}>
          <SolanaWalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>{children}</WalletModalProvider>
          </SolanaWalletProvider>
        </ConnectionProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
