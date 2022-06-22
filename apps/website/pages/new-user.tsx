import { InferGetServerSidePropsType } from 'next';

import { TOKENS } from '@gateway/theme';

import { DashboardTemplate } from '../components/templates/dashboard';
import { NewUserTemplate } from '../components/templates/new-user';
import { withAuth } from '../utils/withAuth';

export const getServerSideProps = withAuth();

export default function NewUser({
  me,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!me) return null;
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
