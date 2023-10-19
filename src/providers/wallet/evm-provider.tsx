import { PropsWithChildren } from 'react';

import { chains, web3client } from '@/services/web3/client';
import { brandColors } from '@/theme';
import {
  RainbowKitProvider,
  darkTheme as DarkTheme,
  Theme,
} from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';

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

export function EvmWalletsProvider({ children }: PropsWithChildren<unknown>) {
  return (
    <WagmiConfig client={web3client}>
      <RainbowKitProvider
        chains={chains}
        modalSize="compact"
        theme={theme}
        appInfo={{
          appName: 'Odyssey',
        }}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
