import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import useTranslation from 'next-translate/useTranslation';

// import { dehydrate, useQuery } from 'react-query';

import { mockDaos } from '../__mock__/daos';
import { mockExplore } from '../__mock__/explore';
import { DashboardTemplate } from '../components/templates/dashboard';
import { AllTab, ExploreTemplate } from '../components/templates/explore';

/** TODO: Prevent template remount when navigating between dashboard pages
 * https://nextjs.org/docs/basic-features/layouts
 * */

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      explore: mockExplore,
    },
  };

  /* TODO: React-query will only work after auth is done */
  /* TODO: https://next-auth.js.org/getting-started/client#nextauthjs--react-query */
  // await queryClient.prefetchQuery('home', () => gqlMethods.Users());
  // const session = await getSession({ req });

  /* TODO: Implement Custom CLient Session Handling <https://next-auth.js.org/getting-started/client#custom-client-session-handling> */
  /* if (!session?.user) {
    return {
      redirect: '/',
      props: {
        user: null,
      },
    };
  }

  const explore = await gqlMethodsServer(session.user.token).get_explore({
    id: session.user.id,
  });

  return {
    props: {
      // dehydratedState: dehydrate(queryClient),
      explore,
    },
  }; */
};

export default function Explore({
  explore: { daos, gates, people },
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation('explore');
  const user: any = {};

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
      followingDaos={mockDaos}
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
        ]}
      />
    </DashboardTemplate>
  );
}
