import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

import { useToggle } from 'react-use';

import { Button, Box, Paper, alpha, Dialog } from '@mui/material';
import Modal from '@mui/material/Modal';

import { LandingTemplate } from '../components/templates/landing';
import { WalletModal } from '../components/templates/landing/wallet-modal';
import useToggleContainerClass from '../hooks/useToggleContainerClass';

export default function Index() {
  const { t } = useTranslation('index');
  const [isOpen, toggleOpen] = useToggle(false);
  useToggleContainerClass('blur', isOpen);
  return (
    <>
      <LandingTemplate
        title={t('title')}
        connectButton={
          <Button variant="contained" onClick={toggleOpen}>
            Connect Wallet
          </Button>
        }
      />
      <Dialog open={isOpen} onClose={toggleOpen}>
        <WalletModal />
      </Dialog>
    </>
  );
}
