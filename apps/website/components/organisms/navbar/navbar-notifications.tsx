import { useMenu } from '@gateway/ui';

import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

export function NavBarNotifications() {
  const userMenu = useMenu();
  return (
    <>
      <Tooltip title="Open Notifications">
        <IconButton onClick={userMenu.onOpen}>
          <Badge color="secondary" variant="dot" overlap="circular">
            <Avatar sx={{}}>
              <NotificationsIcon />
            </Avatar>
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: (theme) => theme.spacing(7) }}
        id="menu-appbar"
        anchorEl={userMenu.element}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={userMenu.isOpen}
        onClose={userMenu.onClose}
      >
        {/* {settings.map((setting) => (
          <MenuItem key={setting} onClick={userMenu.onClose}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))} */}
      </Menu>
    </>
  );
}
