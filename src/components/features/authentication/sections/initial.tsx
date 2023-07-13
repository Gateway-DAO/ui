import useTranslation from 'next-translate/useTranslation';

import { Stack, Typography } from '@mui/material';

import { AuthenticationOptions } from '../components/authentication-options';
import { LoginEmail } from '../components/login-email';
import { TitleSubtitleField } from '../components/title-field';

export function AuthenticationInitial() {
  const { t } = useTranslation('authentication');

  return (
    <Stack gap={2} direction={'column'}>
      <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
        {t('steps.initial.title')}
      </Typography>
      <TitleSubtitleField
        title={t('steps.initial.title-email')}
        subtitle={t('steps.initial.caption-email')}
      />
      <LoginEmail />
      <AuthenticationOptions />
    </Stack>
  );
}
