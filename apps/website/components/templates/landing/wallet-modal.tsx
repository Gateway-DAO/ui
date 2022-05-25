import { useConnect, useAccount, useDisconnect } from 'wagmi';

import {
  MetamaskIcon,
  CoinbaseWalletIcon,
  WalletConnectIcon,
} from '@gateway/assets';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import InboxIcon from '@mui/icons-material/Inbox';
import {
  Box,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';

const icons = {
  metaMask: <MetamaskIcon />,
  walletConnect: <WalletConnectIcon />,
  coinbaseWallet: <CoinbaseWalletIcon />,
  injected: <AccountBalanceWalletIcon color="secondary" />,
};

export function WalletModal() {
  const {
    activeConnector,
    connect,
    connectors,
    error,
    isConnecting,
    pendingConnector,
  } = useConnect();

  return (
    <>
      <Stack alignItems="center" direction="row">
        <DialogTitle>
          Connect Wallet
          <Typography
            component="span"
            variant="caption"
            display="block"
            color="secondary.dark"
          >
            Polygon Network
          </Typography>
        </DialogTitle>
      </Stack>
      <List>
        {connectors.map((x) => (
          <ListItem key={x.id} disablePadding>
            <ListItemButton disabled={!x.ready} onClick={() => connect(x)}>
              <ListItemIcon>{icons[x.id]}</ListItemIcon>
              <ListItemText primary={x.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* {error && <div>{error.message}</div>} */}
    </>
  );
}
