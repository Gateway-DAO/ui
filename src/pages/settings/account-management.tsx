import { Settings } from '@/components/features/settings';
import { AccountManagementSettings } from '@/components/features/settings';
import { HeadContainer } from '@/components/molecules/head-container';
import { DashboardTemplate } from '@/components/templates/dashboard';
import { useAuth } from '@/providers/auth';

export default function AccountManagementSettingsPage() {
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
        <Settings>
          <AccountManagementSettings />
        </Settings>
      </DashboardTemplate>
    </>
  ) : null;
}

AccountManagementSettingsPage.auth = true;
