import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
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
import { gqlMethods } from '../services/api';
import { Get_HomeQuery } from '../services/graphql/types.generated';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  /* TODO: React-query will only work after auth is done */
  /* TODO: https://next-auth.js.org/getting-started/client#nextauthjs--react-query */
  // await queryClient.prefetchQuery('home', () => gqlMethods.Users());
  const session = await getSession({ req });

  /* TODO: Implement Custom CLient Session Handling <https://next-auth.js.org/getting-started/client#custom-client-session-handling> */
  if (!session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
      props: {
        homeProps: undefined,
      },
    };
  }

  const homeProps = await gqlMethods(session.user).get_home({
    id: session.user.id,
  });

  if (!homeProps.me.init)
    return {
      props: {
        homeProps,
      },
      redirect: {
        destination: '/new-user',
        permanent: true,
      },
    };

  return {
    props: {
      // dehydratedState: dehydrate(queryClient),
      homeProps,
    },
  };
};

/** TODO: Prevent template remount when navigating between dashboard pages
 * https://nextjs.org/docs/basic-features/layouts
 * */

export default function Home({ homeProps }: { homeProps?: Get_HomeQuery }) {
  const { t } = useTranslation('dashboard-home');

  if (!homeProps) return null;
  const { daos, gates, people, me } = homeProps;

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
      <HomeTemplate title={t('title', { name: me.name })}>
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
