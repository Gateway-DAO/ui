import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useMenu } from '../../hooks/use-menu';
import { useTheme } from '@mui/material/styles';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export function NavBarNotifications() {
  const userMenu = useMenu();
  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={userMenu.onOpen}>
          <Badge color="secondary" variant="dot" overlap="circular">
            <Avatar sx={{ }}>
              <NotificationsIcon />
            </Avatar>
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
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
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={userMenu.onClose}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
