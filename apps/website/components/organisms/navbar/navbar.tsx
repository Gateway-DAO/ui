import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { TOKENS } from '@gateway/theme';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, IconButton, Stack } from '@mui/material';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';

import { NavbarMenu } from './navbar-menu';

const ClientNav = dynamic(
  () => import('./client-nav').then((mod) => mod.ClientNav),
  {
    ssr: false,
  }
);

export interface NavbarProps extends AppBarProps {
  isInternalPage?: boolean;
}

export function Navbar({ isInternalPage, ...props }: NavbarProps) {
  const router = useRouter();

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
          {isInternalPage && (
            <IconButton onClick={() => router.back()}>
              <Avatar>
                <ArrowBackIcon />
              </Avatar>
            </IconButton>
          )}
          {!isInternalPage && (
            <TextField
              placeholder="Search on Gateway"
              fullWidth
              InputLabelProps={{
                sx: {
                  '&.MuiInputLabel-root:not(.MuiInputLabel-shrink)': {
                    transform: 'translate(14px, 8px) scale(1)',
                  },
                  '& .MuiFilledInput-root:hover': {
                    backgroundColor: 'red',
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
                  <InputAdornment
                    position="end"
                    sx={{
                      paddingRight: 1,
                    }}
                  >
                    <SearchIcon
                      sx={{
                        color: 'rgba(255, 255, 255, 0.56)',
                      }}
                    />
                  </InputAdornment>
                ),
                fullWidth: true,
                sx: {
                  borderRadius: 100,
                  paddingX: 1,
                  paddingY: 0.5,
                },
                size: 'small',
              }}
              onKeyDown={(e: any) =>
                e.key == 'Enter' &&
                router.push(`/search/${(e.target as HTMLInputElement).value}`)
              }
            />
          )}
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
          <ClientNav />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
