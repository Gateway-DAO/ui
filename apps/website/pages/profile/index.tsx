import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from 'next-auth/react';

import { DashboardTemplate } from '../../components/templates/dashboard';
import { ProfileTemplate } from '../../components/templates/profile';
import { gqlMethods } from '../../services/api';

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

  return {
    props: {
      user,
    },
  };
};

export default function Profile({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <DashboardTemplate showExplore={false}>
      <ProfileTemplate user={user} />
    </DashboardTemplate>
  );
}
