import { useRouter } from 'next/router';

import { HeadContainer } from '@/components/molecules/head-container';
import { DashboardTemplate } from '@/components/templates/dashboard';
import {
  ProfileTemplate,
  PrivateProfileTemplate,
} from '@/components/templates/profile';
import { useAuth } from '@/providers/auth';
import { gqlAnonMethods } from '@/services/hasura/api';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

export default function Profile() {
  const router = useRouter();
  const { username } = router.query;
  const { me, gqlAuthMethods } = useAuth();

  const {
    data: {
      users: [user],
    },
  } = useQuery(['user', username], () =>
    gqlAuthMethods.get_user_by_username({
      username: username as string,
    })
  );

  return (
    <>
      <HeadContainer title={`${user.name} Profile`} />
      <DashboardTemplate
        containerProps={{
          sx: {
            overflow: 'hidden',
          },
        }}
      >
        {user.username == me?.username ? (
          <PrivateProfileTemplate />
        ) : (
          <ProfileTemplate user={user} />
        )}
      </DashboardTemplate>
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  const { username } = params;

  if (!username) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['user', username], () =>
    gqlAnonMethods.get_user_by_username({
      username,
    })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
