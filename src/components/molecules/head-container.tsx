import Head from 'next/head';
import { useRouter } from 'next/router';

import { SEOFavicon, SEOSocial } from '@/components/atoms/seo';
import { BASE_URL } from '@/constants/config';

type HeadContainerProps = {
  title?: string;
  description?: string;
  ogImage?: string;
  twitterImage?: string;
  ogTitle?: string;
  ogDescription?: string;
};

const defaultTexts = {
  title: 'The standard for Private Data Assets - Odyssey',
  description:
    'We provide the technology needed to issue, manage, index, and utilize credentials to build a robust digital identity.',
  ogImage: '/social.png',
};

export function HeadContainer({
  title,
  description,
  ogImage = 'default',
  twitterImage,
  ogTitle,
  ogDescription,
}: HeadContainerProps): JSX.Element {
  const router = useRouter();
  const currentURL = `${BASE_URL()}${router.asPath}`;

  const customTitle = title ? title + ' - Odyssey' : defaultTexts.title;
  const customDescription = description || defaultTexts.description;
  const customOgDescription = ogDescription || description;

  return (
    <Head>
      <title>{customTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="author" content="Odyssey" />
      <meta name="description" content={customDescription} />
      <meta property="og:url" content={currentURL} />
      <meta
        property="og:image"
        content={ogImage === 'default' ? defaultTexts.ogImage : ogImage}
      />
      <meta
        property="thumbnail"
        content={ogImage === 'default' ? defaultTexts.ogImage : ogImage}
      />
      {twitterImage && <meta name="twitter:image" content={twitterImage} />}
      <meta property="twitter:url" content={currentURL} />

      {ogTitle && <meta name="og:title" content={ogTitle} />}
      <meta name="og:description" content={customOgDescription} />
      <SEOFavicon />
      <SEOSocial />
    </Head>
  );
}
