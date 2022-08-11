/* eslint-disable @next/next/inline-script-id */
import { AppProps as NextAppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useState } from 'react';

import { Hydrate, QueryClientProvider } from 'react-query';
import { WagmiConfig } from 'wagmi';

import { ThemeProvider } from '@gateway/theme';

import { useTheme } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

import { SEOSocial, SEOFavicon } from '../components/atoms/seo';
import { NavStateProvider } from '../hooks/use-nav';
import { usePersistLocale } from '../hooks/usePersistLocale';
import { AuthProvider } from '../providers/auth';
import { CyberConnectProvider } from '../providers/cyberconnect';
import { queryClient } from '../services/query-client';
import { web3client } from '../services/web3/client';

import '../components/atoms/global-dependencies';
import '../styles/next.css';

type AppProps = NextAppProps & {
  Component: NextAppProps['Component'] & { auth?: boolean };
};

function CustomApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  const theme = useTheme();
  const router = useRouter();
  usePersistLocale();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setIsLoading(true);
    });

    router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
    });

    router.events.on('routeChangeError', () => {
      setIsLoading(false);
    });
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Gateway</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <SEOFavicon />
        <SEOSocial />
      </Head>
      {isLoading && (
        <LinearProgress
          sx={{
            backgroundColor: `${theme.palette.secondary.main}`,
            '& .MuiLinearProgress-bar': {
              backgroundColor: `${theme.palette.secondary.dark}`,
            },
          }}
        />
      )}
      <WagmiConfig client={web3client}>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <AuthProvider isAuthPage={Component.auth}>
                <CyberConnectProvider>
                  <NavStateProvider>
                    <Component {...pageProps} />
                  </NavStateProvider>
                </CyberConnectProvider>
              </AuthProvider>
            </Hydrate>
          </QueryClientProvider>
        </ThemeProvider>
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
