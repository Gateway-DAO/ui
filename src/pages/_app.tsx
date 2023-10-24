/* eslint-disable @next/next/inline-script-id */
import { SessionProvider } from 'next-auth/react';
import { AppProps as NextAppProps } from 'next/app';
import Script from 'next/script';
import NextNProgress from 'nextjs-progressbar';

import Notistack from '@/components/atoms/notistack';
import { NavStateProvider } from '@/hooks/use-nav';
import { usePersistLocale } from '@/hooks/usePersistLocale';
import { AuthProvider } from '@/providers/auth';
import { BiconomyProvider } from '@/providers/biconomy';
import { WalletProvider } from '@/providers/wallet/wallet-provider';
import { queryClient } from '@/services/query-client';
import { ThemeProvider } from '@/theme';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import '@/components/atoms/global-dependencies';
import '../styles/next.css';

type AppProps = NextAppProps & {
  Component: NextAppProps['Component'] & { auth?: boolean } & {
    PageLayout?: React.ComponentType;
  };
};

function CustomApp({ Component, pageProps }: AppProps) {
  usePersistLocale();
  const LayoutComponent = Component.PageLayout || EmptyLayout;

  return (
    <>
      <NextNProgress
        height={4}
        color={'#9A53FF'}
        options={{ showSpinner: false }}
      />

      <ThemeProvider>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <WalletProvider>
            <QueryClientProvider client={queryClient}>
              <Hydrate state={pageProps.dehydratedState}>
                <Notistack>
                  <AuthProvider isAuthPage={Component.auth}>
                    <BiconomyProvider>
                      <NavStateProvider>
                        <LayoutComponent>
                          <Component {...pageProps} />
                        </LayoutComponent>
                      </NavStateProvider>
                    </BiconomyProvider>
                  </AuthProvider>
                </Notistack>
              </Hydrate>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </WalletProvider>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}

const EmptyLayout = ({ children }) => <>{children}</>;

export default CustomApp;
