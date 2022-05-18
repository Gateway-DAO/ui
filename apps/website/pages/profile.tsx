import { TOKENS } from '@gateway/theme';

import { DashboardTemplate } from '../components/templates/dashboard';
import { ProfileTemplate } from '../components/templates/profile';

export default function Profile() {
  return (
    <DashboardTemplate
      showExplore={true}
      containerProps={{
        sx: {
          px: TOKENS.CONTAINER_PX,
          py: TOKENS.CONTAINER_PX,
          display: { xs: 'block', md: 'flex' },
          justifyContent: 'center',
        },
      }}
    >
      <ProfileTemplate />
    </DashboardTemplate>
  );
}
