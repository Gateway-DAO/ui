import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { PartialDeep } from 'type-fest';

import { DashboardTemplate } from '../../components/templates/dashboard';
import {
  ProfileTemplate,
  PrivateProfileTemplate,
} from '../../components/templates/profile';
import { useAuth } from '../../providers/auth';
import { gqlAnonMethods } from '../../services/api';
import { SessionUser } from '../../types/user';

export default function Profile({ user }: { user: PartialDeep<SessionUser> }) {
  const router = useRouter();
  const { username } = router.query;
  const { me } = useAuth();

  return (
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

  const { users } = await gqlAnonMethods.get_user_by_username({
    username,
  });

  return {
    props: {
      user: users[0],
    },
  };
};
