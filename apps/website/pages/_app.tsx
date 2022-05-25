import { AppProps } from 'next/app';
import Head from 'next/head';

import { Hydrate, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { WagmiConfig } from 'wagmi';

import { ThemeProvider } from '@gateway/theme';

import { SEOSocial, SEOFavicon } from '../components/atoms/seo';
import { usePersistLocale } from '../hooks/usePersistLocale';

import '../components/atoms/global-dependencies';

import '../styles/next.css';
import { queryClient } from '../services/query-client';
import { web3client } from '../services/web3/client';

function CustomApp({ Component, pageProps }: AppProps) {
  usePersistLocale();
  return (
    <>
      <Head>
        <title>Gateway</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <SEOFavicon />
        <SEOSocial />
      </Head>
      <WagmiConfig client={web3client}>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </Hydrate>
          </QueryClientProvider>
        </ThemeProvider>
      </WagmiConfig>
    </>
  );
}

export default CustomApp;
