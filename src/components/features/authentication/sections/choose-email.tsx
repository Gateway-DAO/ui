import useTranslation from 'next-translate/useTranslation';

import { Stack, Typography } from '@mui/material';

import { Email } from '../components/email';
import { TitleSubtitleField } from '../components/title-field';

export function ChooseEmail() {
  const { t } = useTranslation('authentication');

  return (
    <Stack gap={2} direction={'column'}>
      <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
        {t('form.signup-methods.title')}
      </Typography>
      <TitleSubtitleField
        title={t('form.signup-methods.title-send-email')}
        subtitle={t('form.signup-methods.caption-send-email')}
      />
      <Email />
    </Stack>
  );
}
