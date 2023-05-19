import { useRouter } from 'next/router';

import { useMutation } from '@tanstack/react-query';

import { HeadContainer } from '@/components/molecules/head-container';
import { DashboardTemplate } from '@/components/templates/dashboard';
import { SettingsTemplate } from '@/components/templates/settings';
import { DeveloperSettings } from '@/components/templates/settings/developer';
import { ROUTES } from '@/constants/routes';
import { useUploadImage } from '@/hooks/use-upload-image';
import { useAuth } from '@/providers/auth';

export default function DeveloperSettingsPage() {
  const uploadImage = useUploadImage();
  const { me, gqlAuthMethods, onInvalidateMe } = useAuth();
  const router = useRouter();

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
          <DeveloperSettings />
        </SettingsTemplate>
      </DashboardTemplate>
    </>
  ) : null;
}

DeveloperSettingsPage.auth = true;
