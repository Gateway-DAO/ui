import Link from 'next/link';
import { useEffect } from 'react';

import { AvatarFile } from '@/components/atoms/avatar-file';
import { ROUTES } from '@/constants/routes';
import { useMenu } from '@/hooks/use-menu';
import { useConnectedWallet } from '@/hooks/wallet/use-connected-wallet';
import { useAuth } from '@/providers/auth';
import { theme } from '@/theme';
import { useSnackbar } from 'notistack';
import { useCopyToClipboard } from 'react-use';

import { ArrowDropDown, ManageAccounts } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LogoutIcon from '@mui/icons-material/Logout';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Settings from '@mui/icons-material/Settings';
import {
  Box,
  Button,
  Divider,
  ListItemText,
  Stack,
  useMediaQuery,
} from '@mui/material';
import Badge, { badgeClasses } from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

/* TODO: Refactor */

type Props = {
  hideProfile?: boolean;
};

export function NavBarAvatar({ hideProfile }: Props) {
  const { element, isOpen, onClose, onOpen, withOnClose } = useMenu();

  const wallet = useConnectedWallet();

  const { onSignOut, me } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [state, copyToClipboard] = useCopyToClipboard();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const address = me?.wallet;

  useEffect(() => {
    if (state?.value) {
      enqueueSnackbar(`Copied Wallet Address!`);
    }
  }, [state]);

  const copyText = () => {
    copyToClipboard(address);
  };

  return (
    <>
      <Tooltip title="Open menu">
        <IconButton onClick={onOpen}>
          <Badge
            overlap="circular"
            badgeContent={
              <ArrowDropDown
                sx={{
                  transform: isOpen ? 'rotate(180deg)' : undefined,
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
            <AvatarFile
              aria-label={me?.name}
              file={me?.picture}
              fallback={'/avatar.png'}
            >
              {me?.name?.[0]}
            </AvatarFile>
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={element}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isOpen}
        onClose={onClose}
        sx={{
          minWidth: '320px',
        }}
      >
        {!hideProfile && (
          <>
            <Stack
              minWidth={320}
              p={2}
              direction="row"
              gap={1}
              alignItems="center"
            >
              <AvatarFile
                sx={{
                  width: '48px',
                  height: '48px',
                }}
                aria-label={me?.name}
                file={me?.picture}
                fallback={'/avatar.png'}
              >
                {me?.name?.[0]}
              </AvatarFile>
              <Box>
                <Typography variant="body2">
                  {me.name || 'Edit your name'}
                </Typography>
                <Typography variant="caption">
                  @{me.protocolUser?.gatewayId}
                </Typography>
              </Box>
            </Stack>
            <Box p={2}>
              <Link passHref href={ROUTES.MY_PROFILE}>
                <Button variant="outlined" fullWidth size="small">
                  View my profile
                </Button>
              </Link>
            </Box>
            <Divider />
          </>
        )}
        <Link
          passHref
          href={isDesktop ? ROUTES.SETTINGS_PUBLIC_PROFILE : ROUTES.SETTINGS}
        >
          <MenuItem
            component="a"
            key="settings"
            sx={{
              py: '12px',
            }}
          >
            <Settings color="disabled" sx={{ mr: 3.5 }} />
            <Typography textAlign="center">Settings</Typography>
          </MenuItem>
        </Link>
        <Link passHref href={ROUTES.SETTINGS_ACCOUNT_MANAGEMENT}>
          <MenuItem
            component="a"
            key="settings"
            sx={{
              py: '12px',
            }}
          >
            <ManageAccounts color="disabled" sx={{ mr: 3.5 }} />
            <Typography textAlign="center">Gateway ID</Typography>
          </MenuItem>
        </Link>
        <MenuItem
          key="disconnect"
          onClick={withOnClose(onSignOut)}
          sx={{
            py: '12px',
          }}
        >
          <LogoutIcon color="disabled" sx={{ mr: 3.5 }} />
          <Typography textAlign="center">Disconnect</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
