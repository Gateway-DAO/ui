import useTranslation from 'next-translate/useTranslation';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import { TitleSubtitleField } from '@/components/atoms/title-field';

import { Stack } from '@mui/material';

export function DeleteId() {
  const { t } = useTranslation('settings');

  return (
    <Stack height={'100%'} gap={4}>
      <TitleSubtitleField
        title={t('account-management.delete-section.title')}
        subtitle={t('account-management.delete-section.desc')}
      />
      <span>
        <LoadingButton variant="contained" color="error" size="large">
          {t('account-management.delete-section.btn')}
        </LoadingButton>
      </span>
    </Stack>
  );
}
