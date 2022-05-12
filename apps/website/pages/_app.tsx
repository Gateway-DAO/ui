import { AppProps } from 'next/app';
import Head from 'next/head';

import { ThemeProvider } from '@gateway/theme';

import { SEOSocial, SEOFavicon } from '../components/atoms/seo';
import { usePersistLocale } from '../hooks/usePersistLocale';

import '../components/atoms/global-dependencies';

import '../styles/next.css';

function CustomApp({ Component, pageProps, router }: AppProps) {
  usePersistLocale();
  return (
    <ThemeProvider>
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
