import { useEffect, useState } from 'react';

import { WalletConnectModal } from '@/components/organisms/wallet-connect-modal';
import { WalletConnectingModal } from '@/components/organisms/wallet-connecting-modal';
import { useConnectedWallet } from '@/hooks/wallet/use-connected-wallet';
import { useDisconnectWallets } from '@/providers/auth/hooks';
import { Protocol_Api_AuthType } from '@/services/hasura/types';
import { useSnackbar } from 'notistack';

import { MigrationModalData } from '../../migration/migration-modal';
import { AuthenticationsItem } from '../../types';
import { useAddWalletModal } from '../hooks';

type Props = {
  onSuccess: () => void;
  onClose: () => void;
  onMigrate: (data: MigrationModalData) => void;
  wallets: AuthenticationsItem[];
};

export function AddWalletModal({
  wallets,
  onMigrate,
  onSuccess,
  onClose,
}: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const wallet = useConnectedWallet();
  const hasWallet = wallets.some(
    (item) =>
      item.type === Protocol_Api_AuthType.Wallet &&
      item.data.address === wallet?.address
  );
  const { enqueueSnackbar } = useSnackbar();
  const { error, step, onReset } = useAddWalletModal({
    wallet,
    hasWallet,
    isAdding,
    onSuccess,
    onMigrate,
  });
  const disconnect = useDisconnectWallets();

  const onConnect = () => {
    setIsAdding(true);
  };

  const onCancel = async () => {
    await disconnect();
    onReset();
    onClose();
  };

  const onRetry = async () => {
    onReset();
    setIsAdding(false);
    await disconnect();
  };

  const onHasWallet = () => {
    enqueueSnackbar(
      'You already have this wallet associated to your GatewayId',
      { variant: 'error' }
    );
    onCancel();
  };

  useEffect(() => {
    if (isAdding && wallet && hasWallet) {
      onHasWallet();
    }
  }, [wallet, hasWallet, isAdding]);

  useEffect(() => {
    // disconnect on mount
    disconnect();
  }, []);

  return (
    <>
      <WalletConnectModal
        title="Add Wallet"
        description="Choose one of available wallet providers or create a new wallet."
        isOpen={!isAdding}
        onCancel={onClose}
        onConnect={onConnect}
      />
      <WalletConnectingModal
        step={step}
        error={error}
        isOpen={
          step === 'get-nonce' ||
          step === 'send-signature' ||
          step === 'add-wallet' ||
          step === 'error'
        }
        onRetry={onRetry}
        onCancel={onCancel}
      />
    </>
  );
}
