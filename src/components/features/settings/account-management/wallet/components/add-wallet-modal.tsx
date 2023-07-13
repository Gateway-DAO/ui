import { useEffect, useState } from 'react';

import { WalletConnectModal } from '@/components/organisms/wallet-connect-modal';
import { useConnectedWallet } from '@/hooks/wallet/use-connected-wallet';
import { Protocol_Api_AuthType } from '@/services/hasura/types';

import { AuthenticationsItem } from '../../types';

type Props = {
  onClose: () => void;
  wallets: AuthenticationsItem[];
};

export function AddWalletModal({ wallets, onClose }: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const wallet = useConnectedWallet();
  const hasWallet = wallets.some(
    (item) =>
      item.type === Protocol_Api_AuthType.Wallet &&
      item.data.address === wallet?.address
  );

  const onConnect = () => {
    setIsAdding(true);
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
    </>
  );
}
