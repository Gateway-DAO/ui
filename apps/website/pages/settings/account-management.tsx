import { useAuth } from '../../providers/auth';

import { DashboardTemplate } from '../../components/templates/dashboard';
import { SettingsTemplate } from '../../components/templates/settings';
import { AccountManagementSettings } from 'apps/website/components/organisms/settings';

export default function AccountManagementSettingsPage() {
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
      <SettingsTemplate children={<AccountManagementSettings />} />
    </DashboardTemplate>
  ) : null;
}

AccountManagementSettingsPage.auth = true;
