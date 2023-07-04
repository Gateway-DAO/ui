import useTranslation from 'next-translate/useTranslation';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import { TitleSubtitleField } from '@/components/atoms/title-field';

import { Stack, Typography } from '@mui/material';

export function EmailAlias() {
  const { t } = useTranslation('settings');

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <TitleSubtitleField
        title={t('account-management.email-section-title')}
        subtitle={t('account-management.email-section-desc')}
      />
      <LoadingButton variant="text">
        {t('account-management.email-section-btn')}
      </LoadingButton>
    </Stack>
  );
}
