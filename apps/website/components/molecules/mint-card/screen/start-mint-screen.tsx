import Typography from '@mui/material/Typography';

import { Avatar, Badge, ListItemAvatar } from '@mui/material';

import { GatewayGrayIcon } from '@gateway/assets';

import Box from '@mui/material/Box';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export const StartMintScreen = ({
  mintProcessStatus,
  setMintProcessStatus,
  mint,
}) => {
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
        <ListItem button onClick={() => mint()}>
          <ListItemAvatar>
            <Badge
              color="success"
              overlap="circular"
              badgeContent=" "
              variant="dot"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <Avatar src={'/images/polygon.png'} />
            </Badge>
          </ListItemAvatar>
          <ListItemText primary="Polygon" secondary="Cost free" />
          <ChevronRightIcon style={{ color: 'grey' }} />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => mint()}>
          <ListItemAvatar>
            <Avatar src={'/images/avalanche.png'} />
          </ListItemAvatar>
          <ListItemText primary="Avalanche" secondary="Cost 0.058 AVAX" />
          <ChevronRightIcon style={{ color: 'grey' }} />
        </ListItem>
      </List>
    </>
  );
};
