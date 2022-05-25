import { useEffect, useMemo, useState } from 'react';

import { AnimatePresence } from 'framer-motion';
import { useToggle } from 'react-use';
import { useConnect } from 'wagmi';

import {
  MetamaskIcon,
  CoinbaseWalletIcon,
  WalletConnectIcon,
} from '@gateway/assets';
import { MotionBox } from '@gateway/ui';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CheckIcon from '@mui/icons-material/Check';
import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
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

function ConnectedWallet() {
  const { activeConnector } = useConnect();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intv = setInterval(() => setCount((c) => c + 1), 1000);

    return () => {
      clearInterval(intv);
    };
  }, []);

  return (
    <Box>
      <DialogTitle sx={{ textAlign: 'center' }}>
        Connecting using {activeConnector.name}
      </DialogTitle>
      <Box
        sx={{
          height: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress color="success" />
      </Box>
      <Box
        sx={{
          height: 36,
          paddingX: 2,
          paddingBottom: 4,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <AnimatePresence>
            <MotionBox
              key={count}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ ease: 'easeInOut' }}
              sx={{ position: 'absolute', textAlign: 'center', width: '100%' }}
            >
              Test {count}
            </MotionBox>
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
}

export function WalletModal() {
  const { connect, connectors, activeConnector, isConnected } = useConnect();

  const [canConnect, toggleCanConnect] = useToggle(false);

  const connectButtonLabel = useMemo(() => {
    if (!isConnected && !activeConnector) return 'Connect to wallet first';
    return `Connect using ${activeConnector.name}`;
  }, [activeConnector, isConnected]);

  if (canConnect) return <ConnectedWallet />;

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
            <ListItemButton onClick={() => connect(x)}>
              <ListItemIcon>{icons[x.id]}</ListItemIcon>
              <ListItemText primary={x.name} />
              <CheckIcon
                color="primary"
                sx={{
                  ml: 4,
                  visibility:
                    x.id === activeConnector?.id ? 'visible' : 'hidden',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <DialogActions>
        <Button
          disabled={!isConnected}
          onClick={toggleCanConnect}
          variant="contained"
          size="small"
          fullWidth
        >
          {connectButtonLabel}
        </Button>
      </DialogActions>
      {/* {error && <div>{error.message}</div>} */}
    </>
  );
}
