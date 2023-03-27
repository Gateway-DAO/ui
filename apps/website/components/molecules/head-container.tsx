import Head from 'next/head';

import { SEOFavicon, SEOSocial } from '../atoms/seo';

type HeadContainerProps = {
  title?: string;
  description?: string;
  ogImage?: string;
  twitterImage?: string;
  ogTitle?: string;
  ogDescription?: string;
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
  ogImage = 'default',
  twitterImage,
  ogTitle,
  ogDescription,
}: HeadContainerProps): JSX.Element {
  title = title ? title + ' - Gateway' : defaultTexts.title;
  description = description || defaultTexts.description;
  ogDescription = ogDescription || description;

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="author" content="Gateway" />
      <meta name="description" content={description} />
      {ogImage && (
        <>
          <meta
            property="og:image"
            content={ogImage === 'default' ? defaultTexts.ogImage : ogImage}
          />
          <meta
            property="thumbnail"
            content={ogImage === 'default' ? defaultTexts.ogImage : ogImage}
          />
        </>
      )}
      {twitterImage && <meta name="twitter:image" content={twitterImage} />}
      {ogTitle && <meta name="og:title" content={ogTitle} />}
      <meta name="og:description" content={ogDescription} />
      <SEOFavicon />
      <SEOSocial />
    </Head>
  );
}
