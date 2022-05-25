import useTranslation from 'next-translate/useTranslation';

import { useToggle } from 'react-use';

import { Button } from '@mui/material';

import { LandingTemplate } from '../components/templates/landing';
import { WalletModal } from '../components/templates/landing/wallet-modal/wallet-modal';
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
      <WalletModal isOpen={isOpen} onClose={toggleOpen} />
    </>
  );
}
