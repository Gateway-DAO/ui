import { AppProps } from 'next/app';
import Head from 'next/head';

import { ApolloProvider } from '@apollo/client';

import { ThemeProvider } from '@gateway/theme';

import { SEOSocial, SEOFavicon } from '../components/atoms/seo';
import { usePersistLocale } from '../hooks/usePersistLocale';

import '../components/atoms/global-dependencies';

import '../styles/next.css';
import { client } from '../services/api';

function CustomApp({ Component, pageProps }: AppProps) {
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
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </>
    </ThemeProvider>
  );
}

export default CustomApp;
