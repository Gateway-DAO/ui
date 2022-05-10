import useTranslation from 'next-translate/useTranslation';

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
        <Paper sx={{ width: 500, height: 500 }}>Wawo</Paper>
        {/*
        <Box
          sx={{
            borderRadius: 4,
            backgroundColor: 'background.paper',
            width: 250,
            height: 250,
            border: 1,
            padding: 4,
            borderColor: alpha('#ffffff', 0.5),
          }}
        >
          <Button  ></Button>
        </Box> */}
      </Modal>
    </>
  );
}
