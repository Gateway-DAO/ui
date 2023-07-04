import { Settings } from '@/components/features/settings';
import { DeveloperSettings } from '@/components/features/settings/developer';
import { HeadContainer } from '@/components/molecules/head-container';
import { DashboardTemplate } from '@/components/templates/dashboard';
import { useAuth } from '@/providers/auth';

export default function DeveloperSettingsPage() {
  const { me } = useAuth();

  return me?.id ? (
    <>
      <HeadContainer title="My settings" />
      <DashboardTemplate
        containerProps={{
          sx: {
            overflow: '',
          },
          height: '100%',
        }}
      >
        <Settings>
          <DeveloperSettings />
        </Settings>
      </DashboardTemplate>
    </>
  ) : null;
}

DeveloperSettingsPage.auth = true;
