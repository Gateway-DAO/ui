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
  title: 'Odyssey - The only way to engage, educate, and market your product!',
  description:
    "Odyssey is a platform allowing users to explore the great products across the new era of the web. Complete quizzes, verify activities, and follow your favorite communities. Odyssey is powered by Gateway's Private Data Protocol.",
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

      <meta name="og:title" content={customTitle} />
      <meta name="og:description" content={customOgDescription} />
      <SEOFavicon />
      <SEOSocial />
    </Head>
  );
}
