import { Settings } from '@/components/features/settings';
import { HeadContainer } from '@/components/molecules/head-container';
import { DashboardTemplate } from '@/components/templates/dashboard';
import { useAuth } from '@/providers/auth';

export default function SettingsPage() {
  const { me } = useAuth();

  return me?.id ? (
    <>
      <HeadContainer title="My settings" ogImage="default" />
      <DashboardTemplate
        containerProps={{
          sx: {
            overflow: '',
          },
          height: '100%',
        }}
      >
        <Settings />
      </DashboardTemplate>
    </>
  ) : null;
}

SettingsPage.auth = true;
