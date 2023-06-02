import { Settings } from '@/components/features/settings';
import { ConnectedAccountsSettings } from '@/components/features/settings';
import { HeadContainer } from '@/components/molecules/head-container';
import { DashboardTemplate } from '@/components/templates/dashboard';
import { useAuth } from '@/providers/auth';

export default function ConnectedAccountsSettingsPage() {
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
          <ConnectedAccountsSettings />
        </Settings>
      </DashboardTemplate>
    </>
  ) : null;
}

ConnectedAccountsSettingsPage.auth = true;
