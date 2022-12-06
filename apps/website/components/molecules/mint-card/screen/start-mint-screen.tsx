import { useNetwork } from 'wagmi';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Avatar, Badge, ListItemAvatar } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { GatewayGrayIcon } from '../assets/gateway-gray';
import { Subjects } from '../mint-card';

const NetworksDetails = [
  {
    name: 'Polygon',
    costInfo: 'Cost free',
    imgSrc: '/images/polygon.png',
  },
];

export const StartMintScreen = ({ setMintProcessStatus, mint }) => {
  const { chain: activeChain } = useNetwork();
  return (
    <Stack display="flex" height="100%">
      <Box
        sx={{
          width: 300,
          flex: 1,
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
      <Box>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mx: 2, fontSize: 18 }}
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
            );
          })}
        </List>
        <Box sx={{ mx: 2, mt: 1, mb: 3 }}>
          <Button
            size="large"
            variant="outlined"
            fullWidth
            onClick={() => setMintProcessStatus(Subjects.default)}
          >
            cancel
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};
