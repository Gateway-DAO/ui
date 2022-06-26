import { InferGetStaticPropsType } from 'next';
import useTranslation from 'next-translate/useTranslation';

// import { dehydrate, useQuery } from 'react-query';

import { DashboardTemplate } from '../components/templates/dashboard';
import { ExploreTemplate } from '../components/templates/explore';
import { gqlAdminMethods } from '../services/api';

/** TODO: Prevent template remount when navigating between dashboard pages
 * https://nextjs.org/docs/basic-features/layouts
 * */

export const getStaticProps = async () => {
  const exploreProps = await gqlAdminMethods.get_home();

  return {
    props: {
      exploreProps,
    },
    revalidate: 10,
  };
};

export default function Explore({
  exploreProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation('explore');

  if (!exploreProps) return null;

  return (
    <DashboardTemplate
      containerProps={{
        sx: {
          pt: 2,
          overflow: 'hidden',
        },
      }}
    >
      <ExploreTemplate
        title={t('title')}
        subtitle={t('subtitle')}
        data={exploreProps}
      />
    </DashboardTemplate>
  );
}
