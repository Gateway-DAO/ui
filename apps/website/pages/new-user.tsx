/* TODO: Gap using values */

import { InferGetServerSidePropsType } from 'next';

import { clearObject } from '@gateway/helpers';
import { TOKENS } from '@gateway/theme';

import { DashboardTemplate } from '../components/templates/dashboard';
import { NewUserTemplate } from '../components/templates/new-user';
import { gqlMethodsServer } from '../services/api-server';

export async function getServerSideProps() {
  const user = (
    await gqlMethodsServer.get_new_user({
      id: '274247ad-16df-42c1-a4f9-624b9fa95ac5',
    })
  )?.user;

  if (!user) {
    return {
      redirect: '/',
    };
  }

  return {
    props: {
      user,
    },
  };
}

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
