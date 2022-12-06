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
  ListItemText,
  Typography,
} from '@mui/material';

import { v4 as uuidv4 } from 'uuid';
import { useNetwork } from 'wagmi';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const NetworksDetails = [
  {
    name: 'Polygon',
    costInfo: 'Cost free',
    imgSrc: '/images/polygon.png',
  },
];

export function MintSelect({ setScreen, mint, setOpen }) {
  const { chain: activeChain } = useNetwork();
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
              <ListItem
                disablePadding
                button
                key={uuidv4()}
                onClick={() => mint()}
              >
                <ListItemAvatar>
                  <Badge
                    color={
                      activeChain?.name == network.name ? 'success' : 'warning'
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
              </ListItem>
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
