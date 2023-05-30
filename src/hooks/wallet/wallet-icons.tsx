import {
  MetamaskIcon,
  CoinbaseWalletIcon,
  WalletConnectIcon,
} from '@/components/atoms/icons';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export const icons = {
  metaMask: <MetamaskIcon />,
  walletConnect: <WalletConnectIcon />,
  coinbaseWallet: <CoinbaseWalletIcon />,
  injected: <AccountBalanceWalletIcon color="secondary" />,
};
