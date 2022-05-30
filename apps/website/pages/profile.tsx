import { InferGetServerSidePropsType } from 'next';

import { clearObject } from '@gateway/helpers';

import { DashboardTemplate } from '../components/templates/dashboard';
import { ProfileTemplate } from '../components/templates/profile';
import { gqlMethodsServer } from '../services/api-server';

export async function getServerSideProps() {
  const user = (
    await gqlMethodsServer.get_new_user({
      id: '85cdb4aa-4ef7-4095-9414-119e1cdb0d1e',
    })
  )?.user;

  return {
    props: {
      user: clearObject(user),
    },
  };
}

export default function Profile({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <DashboardTemplate showExplore={false}>
      <ProfileTemplate user={user} />
    </DashboardTemplate>
  );
}
