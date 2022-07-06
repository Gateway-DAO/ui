import { useState } from 'react';

import {
  MetamaskIcon,
  CoinbaseWalletIcon,
  WalletConnectIcon,
} from '@gateway/assets';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Dialog } from '@mui/material';

import { ConnectedWallet } from './connected-wallet-modal';
import { Faq } from './faq';
import { WalletSelect } from './wallet-select';

export const icons = {
  metaMask: <MetamaskIcon />,
  walletConnect: <WalletConnectIcon />,
  coinbaseWallet: <CoinbaseWalletIcon />,
  injected: <AccountBalanceWalletIcon color="secondary" />,
};

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess: () => void;
};

type Steps = 'SELECT_WALLET' | 'FAQ' | 'ERROR' | 'CONNECTING';

export function WalletModal({ isOpen, onSuccess, onClose }: Props) {
  const [step, setStep] = useState<Steps>('SELECT_WALLET');
  const onBack = () => setStep('SELECT_WALLET');
  const onConnect = () => setStep('CONNECTING');
  const onFaq = () => setStep('FAQ');
  const onError = () => setStep('ERROR');

  const onCloseModal = () => {
    switch (step) {
      case 'CONNECTING':
        return null;
      case 'SELECT_WALLET':
        return onClose();
      default:
        return onBack();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onCloseModal} maxWidth="xs">
      <>
        {step === 'SELECT_WALLET' && (
          <WalletSelect onFaq={onFaq} onSubmit={onConnect} onCancel={onClose} />
        )}
        {step === 'FAQ' && <Faq onBack={onBack} />}
        {(step === 'CONNECTING' || step === 'ERROR') && (
          <ConnectedWallet
            isError={step === 'ERROR'}
            onError={onError}
            onSuccess={onSuccess}
            onBack={onBack}
          />
        )}
      </>
    </Dialog>
  );
}
