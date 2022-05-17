import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

import { useToggle } from 'react-use';

import { Button, Box, Paper, alpha } from '@mui/material';
import Modal from '@mui/material/Modal';

import { LandingTemplate } from '../components/templates/landing';
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
      <Modal
        open={isOpen}
        onClose={toggleOpen}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Paper
          sx={{
            width: {
              xs: `calc(100% - 2rem)`,
              sm: 100,
            },
            height: 500,
          }}
        >
          {/* Wallet connection stuff */}
        </Paper>
      </Modal>
    </>
  );
}
