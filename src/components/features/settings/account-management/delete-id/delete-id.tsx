import useTranslation from 'next-translate/useTranslation';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import { TitleSubtitleField } from '@/components/atoms/title-field';
import { useToggle } from 'react-use';

import { Stack } from '@mui/material';

import { DeleteModal } from './delete-modal';

export function DeleteId() {
  const { t } = useTranslation('settings');
  const [openModal, toggleModal] = useToggle(false);

  return (
    <Stack height={'100%'} gap={4}>
      <DeleteModal open={openModal} handleClose={toggleModal} />
      <TitleSubtitleField
        title={t('account-management.delete-section.title')}
        subtitle={t('account-management.delete-section.desc')}
      />
      <span>
        <LoadingButton
          onClick={toggleModal}
          variant="contained"
          color="error"
          size="large"
        >
          {t('account-management.delete-section.btn')}
        </LoadingButton>
      </span>
    </Stack>
  );
}
