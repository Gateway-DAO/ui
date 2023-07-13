import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import { TitleSubtitleField } from '@/components/atoms/title-field';
import { ModalRightConfirmation } from '@/components/molecules/modal/modal-right-confirmation';
import { useAuth } from '@/providers/auth';
import { useDisconnectWallets } from '@/providers/auth/hooks';
import { Protocol_Api_AuthType } from '@/services/hasura/types';
import { queryClient } from '@/services/query-client';

import { Stack } from '@mui/material';

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

  const onSuccessFinishModal = async () => {
    await disconnect();
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
        title={t('common:modal-confirm-delete.title')}
        open={modalRight?.type === 'remove'}
        handleClose={onCloseModal}
      >
        {modalRight?.type === 'remove' &&
          modalRight.authItem.type === Protocol_Api_AuthType.Wallet && (
            <RemoveWallet
              item={modalRight?.authItem}
              onSuccess={onSuccessFinishModal}
              onCancel={onCloseModal}
            />
          )}
      </ModalRightConfirmation>
      {modalRight?.type === 'add' && (
        <AddWalletModal wallets={wallets} onClose={onCloseModal} />
      )}
    </Stack>
  );
}
