import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';

import { ThemeProvider } from '@gateway/theme';

import { SEOSocial, SEOFavicon } from '../components/atoms/seo';
import { usePersistLocale } from '../hooks/usePersistLocale';

import '../components/atoms/global-dependencies';

import '../styles/next.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  usePersistLocale();
  return (
    <ThemeProvider containerId="#__next">
      <>
        <Head>
          <title>Gateway</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <SEOFavicon />
          <SEOSocial />
        </Head>
        {getLayout(<Component {...pageProps} />)}
      </>
    </ThemeProvider>
  );
}

export default CustomApp;
