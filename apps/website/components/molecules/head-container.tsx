import Head from 'next/head';

import { SEOFavicon, SEOSocial } from '../atoms/seo';

type HeadContainerProps = {
  title?: string;
  description?: string;
  ogImage?: string;
  twitterImage?: string;
};

const defaultTexts = {
  title: 'The standard for credentials - Gateway',
  description:
    'We provide the technology needed to issue, manage, index, and utilize credentials to build a robust digital identity.',
  ogImage: '/social.png',
};

export function HeadContainer({
  title,
  description,
  ogImage,
  twitterImage,
}: HeadContainerProps): JSX.Element {
  title = title ? title + ' - Gateway' : defaultTexts.title;
  description = description || defaultTexts.description;
  // ogImage = ogImage || defaultTexts.ogImage;

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="author" content="Gateway" />
      <meta name="description" content={description} />
      <meta property="og:image" content={ogImage} />
      {twitterImage && <meta name="twitter:image" content={twitterImage} />}
      <SEOFavicon />
      <SEOSocial />
    </Head>
  );
}
