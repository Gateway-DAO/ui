import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';

import * as Sentry from '@sentry/nextjs';

// import { dehydrate, useQuery } from 'react-query';

import { DashboardTemplate } from '../components/templates/dashboard';
import { ExploreTemplate } from '../components/templates/explore';
import { withAuth } from '../utils/withAuth';

/** TODO: Prevent template remount when navigating between dashboard pages
 * https://nextjs.org/docs/basic-features/layouts
 * */

export const getServerSideProps = withAuth(async ({ gql, session }) => {
  const exploreProps = await gql.get_explore({
    id: session.user.id,
  });

  return {
    props: {
      exploreProps,
    },
  };
});

export default function Explore({
  exploreProps,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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

Explore.auth = true;
