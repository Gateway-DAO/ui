import { PropsWithChildren } from 'react';

import { GatewayIcon } from '@gateway/assets';
import { Navbar } from '@gateway/ui';

import ExploreIcon from '@mui/icons-material/Explore';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { alpha, Avatar, IconButton, Tooltip, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';

// eslint-disable-next-line @typescript-eslint/ban-types
export type DashboardTemplateProps = {};

export function DashboardTemplate({
  children,
}: PropsWithChildren<DashboardTemplateProps>) {
  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Box
        component="nav"
        sx={{ flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          color="transparent"
          sx={{
            height: '100%',
            '& .MuiDrawer-paper': {
              pt: 1,
              position: 'relative',
              background: 'transparent',
            },
          }}
          open
        >
          <IconButton color="primary" sx={{ mx: 0.5 }}>
            <Avatar sx={{ background: 'transparent' }}>
              <GatewayIcon sx={{}} />
            </Avatar>
          </IconButton>
          <List
            sx={{
              gap: 0.5,
              px: 0.5,
              display: 'flex',
              flexFlow: 'column',
              '.MuiListItem-root': { p: 1, borderRadius: '100%' },
              '.MuiListItemIcon-root': { color: 'white', minWidth: 'auto' },
            }}
          >
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <Tooltip key={text} title={text} placement="right">
                <ListItem button>
                  <ListItemIcon>
                    <Avatar>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </Avatar>
                  </ListItemIcon>
                </ListItem>
              </Tooltip>
            ))}
            <Tooltip title="Explore" placement="right">
              <ListItem button>
                <ListItemIcon>
                  <Avatar>
                    <ExploreIcon />
                  </Avatar>
                </ListItemIcon>
              </ListItem>
            </Tooltip>
          </List>
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, pt: 1 }}>
        <Navbar />
        {children}
      </Box>
    </Box>
  );
}

export default DashboardTemplate;
