import { DashboardTemplate } from '../../components/templates/dashboard';
import { SettingsTemplate } from '../../components/templates/settings';
import { useAuth } from '../../providers/auth';

export default function Settings() {
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
      <SettingsTemplate />
    </DashboardTemplate>
  ) : null;
}

Settings.auth = true;
