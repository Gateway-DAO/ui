import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';

// import { dehydrate, useQuery } from 'react-query';

import { mockDaos } from '../__mock__/daos';
import { DashboardTemplate } from '../components/templates/dashboard';
import {
  AllTab,
  DaosTab,
  GatesTab,
  ExploreTemplate,
} from '../components/templates/explore';
import { gqlMethods } from '../services/api';

/** TODO: Prevent template remount when navigating between dashboard pages
 * https://nextjs.org/docs/basic-features/layouts
 * */

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  /* TODO: Implement Custom CLient Session Handling <https://next-auth.js.org/getting-started/client#custom-client-session-handling> */
  if (!session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
      props: {
        exploreProps: undefined,
      },
    };
  }

  const exploreProps = await gqlMethods(session.user).get_explore({
    id: session.user.id,
  });

  if (!exploreProps.me.init)
    return {
      props: {
        exploreProps,
      },
      redirect: {
        destination: '/new-user',
        permanent: true,
      },
    };

  return {
    props: {
      // dehydratedState: dehydrate(queryClient),
      exploreProps,
    },
  };
};

export default function Explore({
  exploreProps,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation('explore');
  if (!exploreProps) return null;

  const { daos, gates, people } = exploreProps;

  /*   const session = useSession();
  console.log(session);
 */
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
        tabs={[
          {
            key: 'all',
            label: t('tabs.all'),
            section: <AllTab {...{ daos, gates, people }} />,
          },
          {
            key: 'gates',
            label: t('tabs.gates'),
            section: <GatesTab {...{ gates }} />,
          },
          {
            key: 'daos',
            label: t('tabs.daos'),
            section: <DaosTab {...{ daos }} />,
          },
          {
            key: 'people',
            label: t('tabs.people'),
            section: <GatesTab {...{ gates }} />,
          },
        ]}
      />
    </DashboardTemplate>
  );
}

Explore.auth = true;
