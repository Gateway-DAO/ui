import { DashboardTemplate } from '../../components/templates/dashboard';
import { SettingsTemplate } from '../../components/templates/settings';
import { AccountManagementSettings } from '../../components/templates/settings';
import { useAuth } from '../../providers/auth';

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
      <SettingsTemplate>
        <AccountManagementSettings />
      </SettingsTemplate>
    </DashboardTemplate>
  ) : null;
}

AccountManagementSettingsPage.auth = true;
