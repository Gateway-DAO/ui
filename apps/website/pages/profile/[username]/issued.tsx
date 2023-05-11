import { useRouter } from 'next/router';

import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

import { useAuth } from '../../../providers/auth';
import { gqlAnonMethods } from '../../../services/hasura/api';
import { IssuedTab } from 'apps/website/components/templates/profile/tabs';
import { ProfileTemplateLayout } from 'apps/website/components/templates/profile';

export default function IssuedProfile() {
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
      <IssuedTab user={user} />
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
IssuedProfile.PageLayout = ProfileTemplateLayout;
