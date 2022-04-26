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
          <Autocomplete
            options={[]}
            fullWidth
            renderInput={(params) => <TextField label="Search on Gateway" {...params}
            InputLabelProps={{
              sx: {
                '&.MuiInputLabel-root': {
                  transform: `translate(36px, 0.5rem)`,
                },
                '&.Mui-focused': {
                  transform: "translate(14px, -9px) scale(0.75)",
                },
                '&.MuiInputLabel-root:not(.Mui-focused) ~ .MuiInputBase-root .MuiOutlinedInput-notchedOutline legend': {
                  maxWidth: 0,
                }
              }
            }}
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
