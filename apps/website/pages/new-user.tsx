/* TODO: Gap using values */

import { TOKENS } from '@gateway/theme';

import { DashboardTemplate } from '../components/templates/dashboard';
import { NewUserTemplate } from '../components/templates/new-user';

export default function NewUser() {
  return (
    <DashboardTemplate
      showExplore={false}
      containerProps={{
        sx: {
          px: TOKENS.CONTAINER_PX,
          py: TOKENS.CONTAINER_PX,
          display: { xs: 'block', md: 'flex' },
          justifyContent: 'center',
          flexDirection: 'column',
        },
      }}
    >
      <NewUserTemplate />
    </DashboardTemplate>
  );
}
