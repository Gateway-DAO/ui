import Typography from '@mui/material/Typography';

import { Avatar, Badge, ListItemAvatar } from '@mui/material';

import { GatewayGrayIcon } from '@gateway/assets';

import Box from '@mui/material/Box';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ImageIcon from '@mui/icons-material/Image';
import { Subjects } from './index';

export const StartMintScreen = ({ setmintProcessStatus }) => {
  return (
    <>
      <Box
        sx={{
          width: 300,
          height: 200,
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
        sx={{ mx: 2, fontSize: 18 }}
      >
        Choose the network
      </Typography>
      <List component="nav" aria-label="mailbox folders">
        <ListItem button onClick={() => setmintProcessStatus(Subjects.minting)}>
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
              <Avatar>
                <ImageIcon />
              </Avatar>
            </Badge>
          </ListItemAvatar>
          <ListItemText primary="Polygon" secondary="Cost free" />
          <ChevronRightIcon style={{ color: 'grey' }} />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Polygon" secondary="Cost free" />
          <ChevronRightIcon style={{ color: 'grey' }} />
        </ListItem>
        <Divider light />
        <ListItem button>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Polygon" secondary="Cost free" />
          <ChevronRightIcon style={{ color: 'grey' }} />
        </ListItem>
      </List>
    </>
  );
};
