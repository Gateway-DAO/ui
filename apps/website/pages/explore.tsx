import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';

// import { dehydrate, useQuery } from 'react-query';

import { Button } from '@mui/material';

import { mockDaos } from '../__mock__/daos';
import { DaoCard } from '../components/molecules/dao-card';
import { GatesCard } from '../components/molecules/gates-card';
import { PersonCard } from '../components/molecules/person-card';
import { DashboardTemplate } from '../components/templates/dashboard';
import {
  HomeTemplate,
  SectionWithGrid,
  SectionWithSlider,
} from '../components/templates/home';
import { gqlMethodsServer } from '../services/api-server';

/** TODO: Prevent template remount when navigating between dashboard pages
 * https://nextjs.org/docs/basic-features/layouts
 * */

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  /* TODO: React-query will only work after auth is done */
  /* TODO: https://next-auth.js.org/getting-started/client#nextauthjs--react-query */
  // await queryClient.prefetchQuery('home', () => gqlMethods.Users());
  const session = await getSession({ req });

  /* TODO: Implement Custom CLient Session Handling <https://next-auth.js.org/getting-started/client#custom-client-session-handling> */
  if (!session?.user) {
    return {
      redirect: '/',
      props: {
        user: null,
      },
    };
  }

  const homeProps = await gqlMethodsServer(session.user.token).get_home({
    id: session.user.id,
  });

  return {
    props: {
      // dehydratedState: dehydrate(queryClient),
      homeProps,
    },
  };
};

export default function Home({
  homeProps: { daos, gates, people },
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation('dashboard-home');
  const user: any = {};

  const session = useSession();
  console.log(session);

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
      <HomeTemplate title={t('title')}>
        <SectionWithSlider
          title={t('featured-gates.title')}
          caption={t('featured-gates.caption')}
          action={<Button>{t('featured-gates.see-more')}</Button>}
          itemWidth={(theme) => theme.spacing(37.75)}
        >
          {gates.map((gate) => (
            <GatesCard key={gate.id} {...gate} />
          ))}
        </SectionWithSlider>
        <SectionWithSlider
          title={t('featured-daos.title')}
          caption={t('featured-daos.caption')}
          action={<Button>{t('featured-daos.see-more')}</Button>}
          itemWidth={(theme) => theme.spacing(51)}
        >
          {daos.map((dao) => (
            <DaoCard key={dao.id} {...dao} />
          ))}
        </SectionWithSlider>
        <SectionWithGrid
          title={t('featured-people.title')}
          caption={t('featured-people.caption')}
          action={<Button>{t('featured-people.see-more')}</Button>}
        >
          {people.map((person) => (
            <PersonCard key={person.id} {...person} />
          ))}
        </SectionWithGrid>
      </HomeTemplate>
    </DashboardTemplate>
  );
}
