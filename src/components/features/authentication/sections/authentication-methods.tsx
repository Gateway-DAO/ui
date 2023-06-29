import useTranslation from 'next-translate/useTranslation';

import { Stack, Typography } from '@mui/material';

import { AuthenticationOptions } from '../components/authentication-options';
import { LoginEmail } from '../components/login-email';
import { TitleSubtitleField } from '../components/title-field';

export function AuthenticationMethods() {
  const { t } = useTranslation('authentication');

  return (
    <Stack gap={2} direction={'column'}>
      <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
        {t('form.authentications.title')}
      </Typography>
      <TitleSubtitleField
        title={t('form.authentications.title-send-email')}
        subtitle={t('form.authentications.caption-send-email')}
      />
      <LoginEmail />
      <AuthenticationOptions />
    </Stack>
  );
}
