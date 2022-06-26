import { TOKENS } from '@gateway/theme';

import SearchIcon from '@mui/icons-material/Search';
import { Button, Stack } from '@mui/material';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';

import { useAuth } from '../../../providers/auth';
import { useModal } from '../../../providers/modal';
import { NavBarAvatar } from './navbar-avatar';
import { NavbarMenu } from './navbar-menu';
import { NavBarMobile } from './navbar-mobile';
import { NavBarNotifications } from './navbar-notifications';

export type NavbarProps = AppBarProps;

export function Navbar(props: NavbarProps) {
  const { me } = useAuth();
  const modal = useModal();
  return (
    <AppBar color="transparent" position="relative" {...props}>
      <Toolbar
        disableGutters
        sx={{
          px: TOKENS.CONTAINER_PX,
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <NavbarMenu />
        <Stack
          direction="row"
          flexGrow={1}
          alignItems="center"
          gap={1}
          sx={{
            display: {
              xs: 'none',
              md: 'flex',
            },
          }}
        >
          <Autocomplete
            options={[]}
            fullWidth
            renderInput={(params) => (
              <TextField
                label="Search on Gateway"
                {...params}
                InputLabelProps={{
                  sx: {
                    '&.MuiInputLabel-root:not(.MuiInputLabel-shrink)': {
                      transform: 'translate(14px, 8px) scale(1)',
                    },
                  },
                  /*
                  start adornment:
                  sx: {
                    '&.MuiInputLabel-root': {
                      transform: `translate(36px, 0.5rem)`,
                    },
                    '&.Mui-focused': {
                      transform: 'translate(14px, -9px) scale(0.75)',
                    },
                    '&.MuiInputLabel-root:not(.Mui-focused) ~ .MuiInputBase-root .MuiOutlinedInput-notchedOutline legend':
                      {
                        maxWidth: 0,
                      },
                  }, */
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  fullWidth: true,
                  sx: { borderRadius: 100 },
                  size: 'small',
                }}
              />
            )}
          />
        </Stack>
        <Box
          display="flex"
          justifyContent="flex-end"
          sx={{
            flexGrow: {
              md: 0.5,
            },
          }}
        >
          {!me ? (
            <Button variant="outlined" color="secondary" onClick={modal.open}>
              Connect Wallet
            </Button>
          ) : (
            <>
              <NavBarNotifications />
              <NavBarAvatar />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
