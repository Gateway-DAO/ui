import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import { TitleSubtitleField } from '@/components/atoms/title-field';
import { ModalRightConfirmation } from '@/components/molecules/modal/modal-right-confirmation';
import { query } from '@/constants/queries';
import { useAuth } from '@/providers/auth';
import { useDisconnectWallets } from '@/providers/auth/hooks';
import { queryClient } from '@/services/query-client';

import { Stack } from '@mui/material';

import {
  MigrationModal,
  MigrationModalData,
} from '../migration/migration-modal';
import { AuthenticationsItem, Modals } from './../types';
import { AddWalletModal } from './components/add-wallet-modal';
import { ListWallets } from './components/list-wallets';
import { RemoveWallet } from './components/remove-wallet';

type Props = {
  wallets: AuthenticationsItem[];
  isLoading: boolean;
};

export function WalletAlias({ wallets, isLoading }: Props) {
  const { me } = useAuth();
  const { t } = useTranslation('settings');
  const [modalRight, setModalRight] = useState<Modals>(null);
  const onCloseModal = () => setModalRight(null);
  const disconnect = useDisconnectWallets();

  const messages: Record<
    'modal-title',
    Partial<Record<Modals['type'], string>>
  > = {
    'modal-title': {
      remove: t('common:modal-confirm-delete.title'),
      migrate: t('account-management.modal-migration.success'),
    },
  };

  const onSuccessFinishModal = async () => {
    setModalRight(null);
    await disconnect();
    queryClient.refetchQueries([
      query.authentications_methods_by_user,
      { id: me?.protocolUser?.id },
    ]);
  };

  const onMigration = (migrationData: MigrationModalData) =>
    setModalRight({ type: 'migrate', migrationData });

  return (
    <Stack id="wallets" gap={3}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <TitleSubtitleField
          title={t('account-management.wallet-section-title')}
          subtitle={t('account-management.wallet-section-desc')}
        />
        <LoadingButton
          variant="text"
          onClick={() => setModalRight({ type: 'add' })}
        >
          {t('account-management.wallet-section-btn')}
        </LoadingButton>
      </Stack>
      <ListWallets
        wallets={wallets}
        isLoading={isLoading}
        onRemoveWallet={setModalRight}
      />
      <ModalRightConfirmation
        title={messages['modal-title'][modalRight?.type]}
        open={modalRight?.type === 'remove' || modalRight?.type === 'migrate'}
        handleClose={onCloseModal}
      >
        {modalRight?.type === 'remove' && (
          <RemoveWallet
            item={modalRight?.authItem}
            onSuccess={onSuccessFinishModal}
            onCancel={onCloseModal}
          />
        )}
        {modalRight?.type === 'migrate' && (
          <MigrationModal
            onClose={onCloseModal}
            onSuccess={onSuccessFinishModal}
            data={modalRight?.migrationData}
          />
        )}
      </ModalRightConfirmation>
      {modalRight?.type === 'add' && (
        <AddWalletModal
          wallets={wallets}
          onClose={onCloseModal}
          onSuccess={onSuccessFinishModal}
          onMigrate={onMigration}
        />
      )}
    </Stack>
  );
}
