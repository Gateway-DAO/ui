import { ArrowDropDown } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { useMenu } from '../../../hooks/use-menu';
import { CenterBadge } from './styles';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export function NavBarAvatar() {
  const userMenu = useMenu();
  const theme = useTheme();
  return (
    <>
      <Tooltip title="Open menu">
        <IconButton onClick={userMenu.onOpen}>
          <CenterBadge
            overlap="circular"
            badgeContent={
              <ArrowDropDown
                sx={{
                  transform: userMenu.isOpen ? 'rotate(180deg)' : undefined,
                  transition: '.2s ease-in-out',
                  transitionProperty: 'transform',
                }}
              />
            }
          >
            <Avatar>R</Avatar>
          </CenterBadge>
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
