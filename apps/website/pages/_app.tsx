import { ThemeProvider } from '@gateway/theme';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { SEOSocial, SEOFavicon } from '../components/atoms/seo';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider containerId='__next'>
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
