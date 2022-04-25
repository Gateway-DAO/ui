import { PropsWithChildren } from "react";
import { Navbar } from "@gateway/ui";
import { GatewayIcon } from '@gateway/assets';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
// import { useTheme } from '@mui/material/styles';
import { IconButton } from "@mui/material";


// eslint-disable-next-line @typescript-eslint/ban-types
export type DashboardTemplateProps = {}


export function DashboardTemplate({children}: PropsWithChildren<DashboardTemplateProps>) {

  return (
    <Box sx={{ display: 'flex', height: "100%" }}>
        <Box
          component="nav"
          sx={{ flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="permanent"
            color="transparent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              height: "100%",
              '& .MuiDrawer-paper': { position: "relative", background: "transparent" },
            }}
            open
          >
            <IconButton color="primary" aria-label="upload picture" size="small">
                <GatewayIcon  />
            </IconButton>
            <List sx={{gap: .5, px: 1, display: "flex", flexFlow: "column"}}>
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text} sx={{ p: 1, borderRadius: "100%"}}>
                  <ListItemIcon sx={{color: "white", minWidth: "auto"}}>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1 }}
        >
          <Navbar />
          {children}
        </Box>
      </Box>
  );
}

export default DashboardTemplate;
