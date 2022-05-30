import { InferGetServerSidePropsType } from 'next';

import { clearObject } from '@gateway/helpers';

import { DashboardTemplate } from '../components/templates/dashboard';
import { ProfileTemplate } from '../components/templates/profile';
import { gqlMethodsServer } from '../services/api-server';

export async function getServerSideProps() {
  const user = (
    await gqlMethodsServer.get_new_user({
      id: 'af0550a2-fb46-4c36-96a5-e68cbbd0e26f',
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
