import AppBar, { AppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { NavBarNotifications } from './navbar-notifications';
import { NavBarAvatar } from './navbar-avatar';
import { NavBarMobile } from './navbar-mobile';

export type NavbarProps = AppBarProps;

export function Navbar(props: NavbarProps) {
    return (
      <AppBar color="transparent" position="relative" {...props}>
        <Toolbar disableGutters sx={{ px: 2 }}>
          <Box display={['flex', null, 'none']} flexGrow={1} alignItems="center">
            <NavBarMobile />
          </Box>
          <Box display={['none', null, 'flex']} flexGrow={1} alignItems="center" gap={1}>
            {/* TODO: Shrinked input with adornment https://github.com/mui/material-ui/issues/13898 */}
          <Autocomplete
            options={[]}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Search on Gateway"
            InputProps={{
              startAdornment:(<InputAdornment position="start" ><SearchIcon /></InputAdornment>),
              fullWidth: true,
              sx: {borderRadius: 100},
              size: "small"
            }}
            />}
          />
          </Box>
          <Box display="flex" flexGrow={.5} justifyContent="flex-end">
            <NavBarNotifications />
            <NavBarAvatar />
          </Box>
        </Toolbar>
      </AppBar>
  );
}

export default Navbar;
