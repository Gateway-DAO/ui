import { useEffect, useState } from 'react';

import Loading from '@/components/atoms/loadings/loading';
import { WalletConnectModal } from '@/components/organisms/wallet-connect-modal';
import { WalletConnectingModal } from '@/components/organisms/wallet-connecting-modal';
import { useAddWalletModal } from '@/hooks/wallet/use-add-wallet';
import { useConnectedWallet } from '@/hooks/wallet/use-connected-wallet';
import { Protocol_Api_AuthType } from '@/services/hasura/types';

import { AuthenticationsItem } from '../../types';

type Props = {
  onClose: () => void;
  wallets: AuthenticationsItem[];
};

export function AddWalletModal({ wallets, onClose }: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const { onRequestWalletSignature, step } = useAddWalletModal();
  const wallet = useConnectedWallet();
  const hasWallet = wallets.some(
    (item) =>
      item.type === Protocol_Api_AuthType.Wallet &&
      item.data.address === wallet?.address
  );

  const onConnect = () => {
    setIsAdding(true);
    onRequestWalletSignature();
  };

  useEffect(() => {
    if (!isAdding || !wallet || hasWallet) return;
  }, [isAdding, hasWallet, wallet]);

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
        // error={error}
        isOpen={
          step === 'get-nonce' ||
          step === 'send-signature' ||
          step === 'add-wallet' ||
          step === 'error'
        }
        // onRetry={onRetry}
        onCancel={onClose}
      />
    </>
  );
}
