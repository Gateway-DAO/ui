import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from 'next-auth/react';

import { TOKENS } from '@gateway/theme';

import { DashboardTemplate } from '../components/templates/dashboard';
import { NewUserTemplate } from '../components/templates/new-user';
import { gqlMethods } from '../services/api';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
      props: {
        user: null,
      },
    };
  }

  const user = (await gqlMethods(session.user).get_new_user()).me;

  if (user.init) {
    return {
      props: {
        user: null,
      },
      redirect: {
        destination: '/home',
        permanent: true,
      },
    };
  }
  return {
    props: {
      user,
    },
  };
};

export default function Home({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!user) return null;
  return (
    <DashboardTemplate
      showExplore={false}
      containerProps={{
        sx: {
          px: TOKENS.CONTAINER_PX,
          py: TOKENS.CONTAINER_PX,
          display: { xs: 'block', md: 'flex' },
          justifyContent: 'center',
        },
      }}
    >
      <NewUserTemplate user={user} />
    </DashboardTemplate>
  );
}
