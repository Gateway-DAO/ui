import Typography from '@mui/material/Typography';

import { Avatar, Badge, ListItemAvatar } from '@mui/material';

import { GatewayGrayIcon } from '../assets/gateway-gray';

import Box from '@mui/material/Box';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useNetwork } from 'wagmi';

const NetworksDetails = [
  {
    name: 'Polygon',
    costInfo: 'Cost free',
    imgSrc: '/images/polygon.png',
  },
  {
    name: 'Avalanche',
    costInfo: 'Cost 0.058 AVAX',
    imgSrc: '/images/avalanche.png',
  },
];

export const StartMintScreen = ({
  mintProcessStatus,
  setMintProcessStatus,
  mint,
}) => {
  const { activeChain } = useNetwork();
  return (
    <>
      <Box
        sx={{
          width: 300,
          height: 130,
          backgroundColor: 'primary',
          '&:hover': {
            backgroundColor: 'primary',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <GatewayGrayIcon
          sx={{
            width: 28,
            height: 28,
            m: 2,
          }}
        />
      </Box>
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ mx: 2, fontSize: 18, mt: 8 }}
      >
        Choose the network
      </Typography>
      <List component="nav" aria-label="mailbox folders">
        {NetworksDetails.map((network, index) => {
          return (
            <>
              {index !== 0 && <Divider light={true} sx={{ mx: 2 }} />}
              <ListItem button onClick={() => mint()}>
                <ListItemAvatar>
                  <Badge
                    color={activeChain.name == network.name ? 'success' : "warning"}
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
          );
        })}
      </List>
    </>
  );
};