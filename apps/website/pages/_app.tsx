import NextProgress from 'next-progress';
import { AppProps as NextAppProps } from 'next/app';
import Head from 'next/head';

import { Hydrate, QueryClientProvider } from 'react-query';
import { WagmiConfig } from 'wagmi';

import { ThemeProvider } from '@gateway/theme';

import { useTheme } from '@mui/material';

import { SEOSocial, SEOFavicon } from '../components/atoms/seo';
import { NavStateProvider } from '../hooks/use-nav';
import { usePersistLocale } from '../hooks/usePersistLocale';

import '../components/atoms/global-dependencies';

import '../styles/next.css';
import { AuthProvider } from '../providers/auth';
import { queryClient } from '../services/query-client';
import { web3client } from '../services/web3/client';

type AppProps = NextAppProps & {
  Component: NextAppProps['Component'] & { auth?: boolean };
};

function CustomApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  usePersistLocale();
  const theme = useTheme();
  return (
    <>
      <Head>
        <title>Gateway</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <SEOFavicon />
        <SEOSocial />
      </Head>
      <NextProgress color={theme.palette.primary.main} />
      <WagmiConfig client={web3client}>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <AuthProvider isAuthPage={Component.auth}>
                <NavStateProvider>
                  <Component {...pageProps} />
                </NavStateProvider>
              </AuthProvider>
            </Hydrate>
          </QueryClientProvider>
        </ThemeProvider>
      </WagmiConfig>
    </>
  );
}

export default CustomApp;
