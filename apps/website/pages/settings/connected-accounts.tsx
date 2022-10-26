import { useAuth } from '../../providers/auth';

import { DashboardTemplate } from '../../components/templates/dashboard';
import { SettingsTemplate } from '../../components/templates/settings';
import { ConnectedAccountsSettings } from 'apps/website/components/organisms/settings';

export default function ConnectedAccountsSettingsPage() {
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
      <SettingsTemplate children={<ConnectedAccountsSettings />} />
    </DashboardTemplate>
  ) : null;
}

ConnectedAccountsSettingsPage.auth = true;
