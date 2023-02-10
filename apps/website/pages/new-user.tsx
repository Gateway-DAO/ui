import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { TOKENS } from '@gateway/theme';

import { DashboardTemplate } from '../components/templates/dashboard';
import { NewUserTemplate } from '../components/templates/new-user';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../providers/auth';

export default function NewUser() {
  const { me } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (me?.init && me?.protocol?.isCompleted) {
      router.replace((router.query?.callback as string) ?? ROUTES.EXPLORE);
    }
  }, [me?.init, router]);

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
      <NewUserTemplate />
    </DashboardTemplate>
  );
}

NewUser.auth = true;
