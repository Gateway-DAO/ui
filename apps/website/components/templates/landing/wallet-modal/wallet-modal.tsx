import { useToggle } from 'react-use';

import {
  MetamaskIcon,
  CoinbaseWalletIcon,
  WalletConnectIcon,
} from '@gateway/assets';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Dialog } from '@mui/material';

import { ConnectedWallet } from './connected-wallet-modal';
import { WalletSelect } from './wallet-select';

export const icons = {
  metaMask: <MetamaskIcon />,
  walletConnect: <WalletConnectIcon />,
  coinbaseWallet: <CoinbaseWalletIcon />,
  injected: <AccountBalanceWalletIcon color="secondary" />,
};

type Props = {
  isOpen?: boolean;
  onClose: () => void;
};

export function WalletModal({ isOpen, onClose }: Props) {
  const [canConnect, toggleCanConnect] = useToggle(false);

  return (
    <Dialog open={isOpen} onClose={!canConnect && onClose}>
      {!canConnect ? (
        <WalletSelect onSubmit={toggleCanConnect} />
      ) : (
        <ConnectedWallet onBack={() => toggleCanConnect(false)} />
      )}
    </Dialog>
  );
}
