import { DashboardTemplate } from '@/components/templates/dashboard';
import { Settings } from '@/components/features/settings';
import { NotificationsSettings } from '@/components/features/settings';
import { useAuth } from '@/providers/auth';

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
      <Settings>
        <NotificationsSettings />
      </Settings>
    </DashboardTemplate>
  ) : null;
}

NotificationsSettingsPage.auth = true;
