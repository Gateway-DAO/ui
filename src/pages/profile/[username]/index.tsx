import { useRouter } from 'next/router';

import { Profile } from '@/components/features/profile';
import { ReceivedTab } from '@/components/features/profile/tabs';
import { useAuth } from '@/providers/auth';
import { gqlAnonMethods } from '@/services/hasura/api';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

export default function ReceivedProfile() {
  const router = useRouter();
  const { username } = router.query;
  const { gqlAuthMethods } = useAuth();

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
      <ReceivedTab user={user} />
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
ReceivedProfile.PageLayout = Profile;
