import useTranslation from 'next-translate/useTranslation';

import { useToggle } from 'react-use';

import { GatewayIcon } from '@gateway/assets';
import { TOKENS } from '@gateway/theme';

import { Stack, Button, Box } from '@mui/material';
import Modal from '@mui/material/Modal';

import useToggleContainerClass from '../hooks/useToggleContainerClass';

export default function Index() {
  const { t } = useTranslation('home');
  const [isOpen, toggleOpen] = useToggle(false);
  useToggleContainerClass('blur', isOpen);
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        px={TOKENS.CONTAINER_PX}
      >
        <GatewayIcon />
        <Button variant="outlined" onClick={toggleOpen}>
          Connect Wallet
        </Button>
      </Stack>
      <Modal open={isOpen} onClose={toggleOpen}>
        <Box>Wa</Box>
      </Modal>
    </>
  );
}
