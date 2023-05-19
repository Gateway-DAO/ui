/* eslint-disable @next/next/inline-script-id */
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
import { SessionProvider } from 'next-auth/react';

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
      {/* Smartlook */}
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
      {/* Google Tag Manager */}
      {process.env.NEXT_PUBLIC_GTM_TAG && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTM_TAG}`}
          />
          <Script
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_TAG}');
              `,
            }}
          />
        </>
      )}

      {/* Hotjar */}
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:3399024,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
        }}
      />
    </>
  );
}

const EmptyLayout = ({ children }) => <>{children}</>;

export default CustomApp;
