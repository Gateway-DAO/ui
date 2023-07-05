import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import { TitleSubtitleField } from '@/components/atoms/title-field';
import { ModalRightConfirmation } from '@/components/molecules/modal/modal-right-confirmation';
import { useAuth } from '@/providers/auth';
import { queryClient } from '@/services/query-client';

import { Stack } from '@mui/material';

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
  const [modalRight, setModalRight] = useState<Modals>(null);

  const onSuccessFinishModal = () => {
    queryClient.refetchQueries([
      'authentications_methods_by_user',
      { id: me?.protocolUser?.id },
    ]),
      setModalRight(null);
  };

  return (
    <Stack gap={3}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <TitleSubtitleField
          title={t('account-management.email-section-title')}
          subtitle={t('account-management.email-section-desc')}
        />
        <LoadingButton
          variant="text"
          onClick={() => setModalRight({ type: 'add' })}
          sx={{ display: 'none' }}
        >
          {t('account-management.email-section-btn')}
        </LoadingButton>
      </Stack>
      <ListEmails
        emails={emails}
        isLoading={isLoading}
        onOpenModal={setModalRight}
      />
      <ModalRightConfirmation
        title={t('common:modal-confirm-delete.title')}
        open={!!modalRight}
        handleClose={() => setModalRight(null)}
      >
        {modalRight?.type === 'remove' && (
          <RemoveEmail
            email={modalRight?.email}
            onSuccess={onSuccessFinishModal}
            onCancel={() => setModalRight(null)}
          />
        )}
        {modalRight?.type === 'add' && <AddEmail />}
      </ModalRightConfirmation>
    </Stack>
  );
}
