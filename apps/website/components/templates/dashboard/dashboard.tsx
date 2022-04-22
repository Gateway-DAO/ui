import { useState, PropsWithChildren } from "react";
import { Navbar } from "@gateway/ui";

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 100;

// eslint-disable-next-line @typescript-eslint/ban-types
export type DashboardTemplateProps = {}


export function DashboardTemplate({children}: PropsWithChildren<DashboardTemplateProps>) {

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const theme = useTheme()

  return (
    <Box sx={{ display: 'flex', height: "100%" }}>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="permanent"
            color="transparent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              height: "100%",
              '& .MuiDrawer-paper': { width: drawerWidth, position: "relative", background: "transparent" },
            }}
            open
          >
            <div>
              <Divider />
              <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon sx={{color: "white"}}>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                  </ListItem>
                ))}
              </List>
            </div>
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Navbar />
          <Divider />
          {children}
        </Box>
      </Box>
  );
}

export default DashboardTemplate;
