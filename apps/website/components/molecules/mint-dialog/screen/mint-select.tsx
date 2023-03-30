import { v4 as uuidv4 } from 'uuid';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  Avatar,
  Badge,
  Button,
  DialogActions,
  DialogContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

import { useConnectedWallet } from '../../../../hooks/wallet/use-connected-wallet';

const NetworksDetails = [
  {
    name: 'Polygon',
    costInfo:
      process.env.NEXT_PUBLIC_GASLESS_MINTING === 'true' ? 'Cost free' : '',
    imgSrc: '/images/polygon.png',
    active: true,
  },
  {
    name: 'Solana',
    costInfo: 'Coming soon...',
    imgSrc: '/images/solana.webp',
    active: false,
  },
];

export function MintSelect({ setScreen, mint, setOpen }) {
  const wallet = useConnectedWallet();

  return (
    <>
      <DialogContent>
        <Typography variant="body1" sx={{ pt: 2 }} color="text.secondary">
          Choose the Network
        </Typography>
        <List component="nav">
          {NetworksDetails.map((network, index) => (
            <>
              {index !== 0 && <Divider light={true} sx={{ mx: 2 }} />}
              <ListItemButton
                key={uuidv4()}
                onClick={() => mint()}
                disabled={!network.active || wallet.chainName != network.name}
              >
                <ListItemAvatar>
                  <Badge
                    color={
                      wallet?.chainName == network.name ? 'success' : 'warning'
                    }
                    overlap="circular"
                    badgeContent=" "
                    variant="dot"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                  >
                    <Avatar src={network.imgSrc} />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={network.name}
                  secondary={network.costInfo}
                />
                <ChevronRightIcon style={{ color: 'grey' }} />
              </ListItemButton>
            </>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setOpen(false)}
          variant="outlined"
          size="large"
          fullWidth
        >
          cancel
        </Button>
      </DialogActions>
    </>
  );
}
