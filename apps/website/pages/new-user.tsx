import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from 'next-auth/react';

import { clearObject } from '@gateway/helpers';
import { TOKENS } from '@gateway/theme';

import { DashboardTemplate } from '../components/templates/dashboard';
import { NewUserTemplate } from '../components/templates/new-user';
import { gqlMethodsServer } from '../services/api-server';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: '/',
      props: {
        user: null,
      },
    };
  }

  const user = (
    await gqlMethodsServer.get_new_user({
      id: session.user.id,
    })
  )?.user;

  return {
    props: {
      user: clearObject(user),
    },
  };
};

export default function Home({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
