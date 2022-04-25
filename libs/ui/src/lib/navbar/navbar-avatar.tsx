import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge, {badgeClasses} from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import { useMenu } from '../../hooks/use-menu';
import { styled } from '@mui/system';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const CenterBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    width: ${({theme}) => theme.spacing(2.5)};
    height: ${({theme}) => theme.spacing(2.5)};
    top: unset;
    bottom: calc(50% - ${({theme}) => theme.spacing(2.5)});
    right: -10%;
  }
`;

export function NavBarAvatar() {
  const userMenu = useMenu();
  const theme = useTheme();
  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={userMenu.onOpen}>
          <CenterBadge variant='dot' color="secondary" overlap="circular" badgeContent={<div>Wawo</div>} >
            <Avatar sx={{background: theme.palette.grey["800"] }}>
              R
            </Avatar>
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
