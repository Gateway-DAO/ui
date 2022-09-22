import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

import {
  RainbowKitProvider,
  darkTheme as DarkTheme,
  Theme,
} from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';

import { brandColors } from '@gateway/theme';

import { chains, web3client } from '../../services/web3/client';

type Props = {
  session: Session; // as defined in next-auth
};

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

export function WalletProvider({
  children,
  session,
}: PropsWithChildren<Props>) {
  return (
    <WagmiConfig client={web3client}>
      <SessionProvider session={session} refetchInterval={0}>
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
      </SessionProvider>
    </WagmiConfig>
  );
}
