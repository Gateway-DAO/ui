import { HeadContainer } from '../../components/molecules/head-container';
import { DashboardTemplate } from '../../components/templates/dashboard';
import { SettingsTemplate } from '../../components/templates/settings';
import { ConnectedAccountsSettings } from '../../components/templates/settings';
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
        <SettingsTemplate>
          <ConnectedAccountsSettings />
        </SettingsTemplate>
      </DashboardTemplate>
    </>
  ) : null;
}

ConnectedAccountsSettingsPage.auth = true;
