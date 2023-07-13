import useTranslation from 'next-translate/useTranslation';

import { SolanaColorIcon } from '@/components/atoms/icons';
import { useDisconnectWallets } from '@/providers/auth/hooks';
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
  title: string;
  description: string;
  isOpen: boolean;
  onCancel: () => void;
  onConnect: () => void;
};

export function WalletConnectModal({
  title,
  description,
  isOpen,
  onCancel,
  onConnect,
}: Props) {
  // Connectors
  const { setVisible } = useWalletModal();
  const { openConnectModal } = useConnectModal();
  const disconnect = useDisconnectWallets();

  const connectWrapper = (connector: () => void) => {
    disconnect();
    onConnect();
    connector?.();
  };

  return (
    <Dialog open={isOpen} onClose={close} maxWidth="xs">
      <DialogTitle sx={{ textAlign: 'left' }}>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{description}</Typography>
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
        <Button onClick={onCancel} size="medium" fullWidth variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
