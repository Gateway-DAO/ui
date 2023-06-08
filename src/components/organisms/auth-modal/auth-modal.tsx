import useTranslation from 'next-translate/useTranslation';

import { SolanaColorIcon } from '@/components/atoms/icons';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { FaEthereum } from 'react-icons/fa';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';

import { ProviderButton } from './provider-button';

require('@solana/wallet-adapter-react-ui/styles.css');

type Props = {
  isOpen: boolean;
  close: () => void;
};

export function AuthModal({ isOpen, close }: Props) {
  // Connectors
  const { setVisible } = useWalletModal();
  const { openConnectModal } = useConnectModal();

  const connectWrapper = (connector: () => void) => {
    close();
    connector();
  };

  const { t } = useTranslation('auth');

  return (
    <Dialog open={isOpen} onClose={close} maxWidth="xs">
      <DialogTitle sx={{ textAlign: 'left' }}>
        {t('select-wallet.title')}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {t('select-wallet.description')}
        </Typography>
        <Stack mt={4}>
          <Typography variant="subtitle1">Choose Network</Typography>
          <Stack direction="row" flex={1} gap={1}>
            <ProviderButton
              label="EVM"
              icon={<FaEthereum size={24} />}
              onClick={() => connectWrapper(openConnectModal)}
            />
            <ProviderButton
              label="Solana"
              icon={<SolanaColorIcon fontSize="medium" />}
              onClick={() => connectWrapper(() => setVisible(true))}
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} size="medium" fullWidth variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
