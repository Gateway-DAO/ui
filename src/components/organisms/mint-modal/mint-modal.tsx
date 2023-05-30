import { useState } from 'react';

import { PolygonCircleIcon, AvalancheIcon } from '@/components/atoms/icons';

import { Dialog } from '@mui/material';

import { MintSelect } from './mint-select';

export const networks = {
  polygon: {
    svg: <PolygonCircleIcon />,
    png: '/images/polygon.png',
    name: 'Polygon',
  },
  avalanche: {
    svg: <AvalancheIcon />,
    png: '/images/avalanche.png',
    name: 'Avalanche',
  },
};

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess: () => void;
};

type Steps = 'SELECT_NETWORK' | 'FAQ' | 'ERROR' | 'CONNECTING';

export function MintModal({ isOpen, onSuccess, onClose }: Props) {
  const [step, setStep] = useState<Steps>('SELECT_NETWORK');
  const onBack = () => setStep('SELECT_NETWORK');
  const onConnect = () => setStep('CONNECTING');
  const onError = () => setStep('ERROR');

  const onCloseModal = () => {
    switch (step) {
      case 'CONNECTING':
        return null;
      case 'SELECT_NETWORK':
        return onClose();
      default:
        return onBack();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onCloseModal} maxWidth="md">
      <MintSelect onSubmit={onConnect} onCancel={onClose} />
    </Dialog>
  );
}
