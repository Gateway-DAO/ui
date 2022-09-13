/* eslint-disable @next/next/inline-script-id */
import { AppProps as NextAppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import NextNProgress from 'nextjs-progressbar';

import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { WagmiConfig } from 'wagmi';

import { ThemeProvider } from '@gateway/theme';

import { SEOSocial, SEOFavicon } from '../components/atoms/seo';
import { NavStateProvider } from '../hooks/use-nav';
import { usePersistLocale } from '../hooks/usePersistLocale';
import { AuthProvider } from '../providers/auth';
import { BiconomyProvider } from '../providers/biconomy';
import { CyberConnectProvider } from '../providers/cyberconnect';
import { queryClient } from '../services/query-client';
import { chains, web3client } from '../services/web3/client';
import '../components/atoms/global-dependencies';
import '../styles/next.css';

type AppProps = NextAppProps & {
  Component: NextAppProps['Component'] & { auth?: boolean };
};

function CustomApp({ Component, pageProps: { ...pageProps } }: AppProps) {
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
      <WagmiConfig client={web3client}>
        <RainbowKitProvider chains={chains}>
          <ThemeProvider>
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
            </QueryClientProvider>
          </ThemeProvider>
        </RainbowKitProvider>
      </WagmiConfig>
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
