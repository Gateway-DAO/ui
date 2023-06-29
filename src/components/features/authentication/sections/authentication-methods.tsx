import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/providers/auth';

import { Stack, Typography } from '@mui/material';

import { AuthenticationOptions } from '../components/authentication-options';
import { Email } from '../components/email';
import { TitleSubtitleField } from '../components/title-field';

type Props = {
  navigateStep: (step: number) => void;
};

export function AuthenticationMethods({ navigateStep }: Props) {
  const { t } = useTranslation('authentication');
  const { me } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (me?.init && me?.protocol?.isCompleted) {
      router.replace((router.query?.redirect as string) ?? ROUTES.EXPLORE);
    }
  }, [me?.init, router]);

  return (
    <Stack gap={2} direction={'column'}>
      <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
        {t('form.signup-methods.title')}
      </Typography>
      <TitleSubtitleField
        title={t('form.signup-methods.title-send-email')}
        subtitle={t('form.signup-methods.caption-send-email')}
      />
      <Email navigateStep={navigateStep} />
      <AuthenticationOptions />
    </Stack>
  );
}
