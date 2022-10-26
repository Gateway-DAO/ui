import { useAuth } from '../../providers/auth';

import { DashboardTemplate } from '../../components/templates/dashboard';
import { SettingsTemplate } from '../../components/templates/settings';
import { NotificationsSettings } from 'apps/website/components/organisms/settings';

export default function NotificationsSettingsPage() {
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
      <SettingsTemplate children={<NotificationsSettings />} />
    </DashboardTemplate>
  ) : null;
}

NotificationsSettingsPage.auth = true;
