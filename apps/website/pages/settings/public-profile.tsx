import { useAuth } from '../../providers/auth';

import { DashboardTemplate } from '../../components/templates/dashboard';
import { SettingsTemplate } from '../../components/templates/settings';
import { PublicProfileSettings } from 'apps/website/components/organisms/settings';

export default function PublicProfileSettingsPage() {
  const { me } = useAuth();

  return me?.id ? (
    <DashboardTemplate
      containerProps={{
        sx: {
          overflow: '',
        },
        height: '100%',
      }}
    >
      <SettingsTemplate children={<PublicProfileSettings />} />
    </DashboardTemplate>
  ) : null;
}

PublicProfileSettingsPage.auth = true;
