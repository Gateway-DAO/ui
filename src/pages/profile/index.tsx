import { HeadContainer } from '@/components/molecules/head-container';
import { DashboardTemplate } from '@/components/templates/dashboard';
import { PrivateProfileTemplate } from '@/components/templates/profile';
import { useAuth } from '@/providers/auth';

// TODO: make the behavior of this page better
export default function Profile() {
  const { me } = useAuth();

  return me?.id ? (
    <>
      <HeadContainer title="My Profile" ogImage="default" />
      <DashboardTemplate
        containerProps={{
          sx: {
            overflow: 'hidden',
          },
        }}
      >
        <PrivateProfileTemplate />
      </DashboardTemplate>
    </>
  ) : null;
}

Profile.auth = true;
