import { InferGetServerSidePropsType } from 'next';

import { TOKENS } from '@gateway/theme';

import { DashboardTemplate } from '../components/templates/dashboard';
import { NewUserTemplate } from '../components/templates/new-user';
import { useAuth } from '../providers/auth';

export default function NewUser() {
  const { me } = useAuth();
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
      <NewUserTemplate user={me} />
    </DashboardTemplate>
  );
}

NewUser.auth = true;
