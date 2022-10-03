/* eslint-disable @next/next/inline-script-id */
import { AppProps as NextAppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import NextNProgress from 'nextjs-progressbar';

import { Hydrate, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@gateway/theme';

import { SEOSocial, SEOFavicon } from '../components/atoms/seo';
import { NavStateProvider } from '../hooks/use-nav';
import { usePersistLocale } from '../hooks/usePersistLocale';
import { AuthProvider } from '../providers/auth';
import { BiconomyProvider } from '../providers/biconomy';
import { CyberConnectProvider } from '../providers/cyberconnect';
import { WalletProvider } from '../providers/wallet/wallet-provider';
import { queryClient } from '../services/query-client';
import '../components/atoms/global-dependencies';
import '../styles/next.css';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type AppProps = NextAppProps & {
  Component: NextAppProps['Component'] & { auth?: boolean };
};

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
      <NextNProgress
        height={4}
        color={'#9A53FF'}
        options={{ showSpinner: false }}
      />

      <ThemeProvider>
        <WalletProvider session={pageProps.session}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <AuthProvider isAuthPage={Component.auth}>
                <BiconomyProvider
                  apiKey={process.env.NEXT_PUBLIC_WEB3_BICONOMY_API_KEY}
                  contractAddress={process.env.NEXT_PUBLIC_WEB3_NFT_ADDRESS}
                >
                  <CyberConnectProvider>
                    <NavStateProvider>
                      <Component {...pageProps} />
                    </NavStateProvider>
                  </CyberConnectProvider>
                </BiconomyProvider>
              </AuthProvider>
            </Hydrate>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </WalletProvider>
      </ThemeProvider>

      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.smartlook||(function(d) {
            var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
            var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
            c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
            })(document);
            smartlook('init', '${process.env.NEXT_PUBLIC_SMARTLOOK_KEY}', { region: 'eu' });
            `,
        }}
      />
    </>
  );
}

export default CustomApp;
