import { DashboardTemplate } from '../../components/templates/dashboard';
import PrivateProfileTemplate from '../../components/templates/private-profile/PrivateProfileTemplate';
import { useAuth } from '../../providers/auth';

// TODO: make the behavior of this page better
export default function Profile() {
  const { me } = useAuth();

  return me?.id ? (
    <DashboardTemplate
      containerProps={{
        sx: {
          overflow: 'hidden',
        },
      }}
    >
      <PrivateProfileTemplate />
    </DashboardTemplate>
  ) : null;
}

// Profile.auth = true;
