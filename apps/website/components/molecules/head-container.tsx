import Head from 'next/head';

import { SEOFavicon, SEOSocial } from '../atoms/seo';

type HeadContainerProps = {
  title?: string;
  description?: string;
};

export function HeadContainer({
  title,
  description,
}: HeadContainerProps): JSX.Element {
  title = title
    ? title + ' - Gateway'
    : 'Best model to earn, issue and manage credentials - Gateway';
  description =
    description ||
    'We provide the technology needed to issue, manage, index, and utilize credentials to build a robust digital identity.';

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="author" content="Gateway" />
      <meta name="description" content={description} />
      <SEOFavicon />
      <SEOSocial />
    </Head>
  );
}
