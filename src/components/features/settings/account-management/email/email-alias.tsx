import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import { TitleSubtitleField } from '@/components/atoms/title-field';
import { ModalRightConfirmation } from '@/components/molecules/modal/modal-right-confirmation';
import { query } from '@/constants/queries';
import { useAuth } from '@/providers/auth';
import { queryClient } from '@/services/query-client';
import { useSnackbar } from 'notistack';

import { Stack } from '@mui/material';

import {
  MigrationModal,
  type MigrationModalData,
} from '../migration/migration-modal';
import { AuthenticationsItem, Modals } from './../types';
import AddEmail from './add-email/add-email';
import { ListEmails } from './components/list-emails';
import { RemoveEmail } from './components/remove-email';

type Props = {
  emails: AuthenticationsItem[];
  isLoading: boolean;
};

export function EmailAlias({ emails, isLoading }: Props) {
  const { me } = useAuth();
  const { t } = useTranslation('settings');
  const { enqueueSnackbar } = useSnackbar();
  const [modalRight, setModalRight] = useState<Modals>(null);

  const onCloseModal = () => setModalRight(null);

  const messages: Record<
    'success' | 'modal-title',
    Partial<Record<Modals['type'], string>>
  > = {
    success: {
      add: t('account-management.message-add-success'),
      remove: t('account-management.message-remove-success'),
      migrate: t('account-management.message-migrate-success'),
    },
    'modal-title': {
      add: t('account-management.add-email.title'),
      remove: t('common:modal-confirm-delete.title'),
      migrate: t('account-management.migrate-email.title'),
    },
  };

  const onMigration = (migrationData: MigrationModalData) =>
    setModalRight({ type: 'migrate', migrationData });

  const onSuccessFinishModal = () => {
    queryClient.refetchQueries([
      query.authentications_methods_by_user,
      { id: me?.protocolUser?.id },
    ]);
    onCloseModal();
    enqueueSnackbar(messages.success[modalRight?.type]);
  };

  return (
    <Stack id="emails">
      <Stack
        justifyContent="space-between"
        gap={3}
        sx={{
          mb: 3,
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
        }}
      >
        <TitleSubtitleField
          title={t('account-management.email-section-title')}
          subtitle={t('account-management.email-section-desc')}
        />
        <LoadingButton
          variant="text"
          sx={{ alignSelf: { xs: 'flex-end', md: 'flex-start' } }}
          onClick={() => setModalRight({ type: 'add' })}
        >
          {t('account-management.email-section-btn')}
        </LoadingButton>
      </Stack>
      <ListEmails
        emails={emails}
        isLoading={isLoading}
        onRemoveEmail={setModalRight}
      />
      <ModalRightConfirmation
        title={messages['modal-title'][modalRight?.type]}
        open={!!modalRight}
        handleClose={onCloseModal}
      >
        {modalRight?.type === 'remove' && (
          <RemoveEmail
            email={modalRight?.authItem.data?.email}
            onSuccess={onSuccessFinishModal}
            onCancel={onCloseModal}
          />
        )}
        {modalRight?.type === 'add' && (
          <AddEmail onSuccess={onSuccessFinishModal} onMigrate={onMigration} />
        )}
        {modalRight?.type === 'migrate' && (
          <MigrationModal
            onSuccess={onSuccessFinishModal}
            data={modalRight.migrationData}
            onClose={onCloseModal}
          />
        )}
      </ModalRightConfirmation>
    </Stack>
  );
}
