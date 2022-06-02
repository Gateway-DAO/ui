import { SessionProvider } from 'next-auth/react';
import { AppProps as NextAppProps } from 'next/app';
import Head from 'next/head';

import { Hydrate, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useAccount, WagmiConfig } from 'wagmi';

import { ThemeProvider } from '@gateway/theme';

import { SEOSocial, SEOFavicon } from '../components/atoms/seo';
import { usePersistLocale } from '../hooks/usePersistLocale';

import '../components/atoms/global-dependencies';

import '../styles/next.css';
import { AuthProvider } from '../providers/auth';
import { queryClient } from '../services/query-client';
import { web3client } from '../services/web3/client';

type AppProps = NextAppProps & {
  Component: NextAppProps['Component'] & { auth?: boolean };
};

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  usePersistLocale();

  return (
    <>
      <Head>
        <title>Gateway</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <SEOFavicon />
        <SEOSocial />
      </Head>
      <SessionProvider session={session}>
        <WagmiConfig client={web3client}>
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>
              <Hydrate state={pageProps.dehydratedState}>
                <AuthProvider isAuthPage={Component.auth}>
                  <Component {...pageProps} />
                </AuthProvider>
              </Hydrate>
            </QueryClientProvider>
          </ThemeProvider>
        </WagmiConfig>
      </SessionProvider>
    </>
  );
}

export default CustomApp;
