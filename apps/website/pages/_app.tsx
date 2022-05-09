import { AppProps } from 'next/app';
import Head from 'next/head';

import { ThemeProvider } from '@gateway/theme';

import { SEOSocial, SEOFavicon } from '../components/atoms/seo';
import { usePersistLocale } from '../hooks/usePersistLocale';

import '../components/atoms/global-dependencies';

function CustomApp({ Component, pageProps }: AppProps) {
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
        <Component {...pageProps} />
      </>
    </ThemeProvider>
  );
}

export default CustomApp;
