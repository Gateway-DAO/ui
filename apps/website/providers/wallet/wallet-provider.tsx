import { Session } from 'next-auth';
import { SessionProvider, useSession } from 'next-auth/react';
import { PropsWithChildren } from 'react';

import {
  RainbowKitProvider,
  darkTheme as DarkTheme,
  Theme,
} from '@rainbow-me/rainbowkit';
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

  return (
    <WagmiConfig client={web3client(!!session)}>
      <RainbowKitProvider
        chains={chains}
        modalSize="compact"
        theme={theme}
        appInfo={{
          appName: 'GatewayDAO',
        }}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
