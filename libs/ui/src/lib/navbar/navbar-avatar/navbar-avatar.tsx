import { ArrowDropDown } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Badge, { badgeClasses } from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { useMenu } from '../../../hooks/use-menu';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export function NavBarAvatar() {
  const userMenu = useMenu();
  return (
    <>
      <Tooltip title="Open menu">
        <IconButton onClick={userMenu.onOpen}>
          <Badge
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
            sx={{
              [`.${badgeClasses.badge}`]: {
                borderRadius: '100%',
                backgroundColor: (theme) => theme.palette.common.white,
                color: (theme) => theme.palette.secondary.contrastText,
                width: (theme) => theme.spacing(2.5),
                height: (theme) => theme.spacing(2.5),
                top: 'unset',
                bottom: (theme) => `calc(50% - ${theme.spacing(2.5)})`,
                right: '-10%',
                boxShadow: (theme) => theme.shadows[1],
              },
            }}
          >
            <Avatar>R</Avatar>
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
