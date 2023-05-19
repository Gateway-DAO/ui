import Link from 'next/link';
import { useEffect } from 'react';

import { useMenu } from '@/hooks/use-menu';
import { useSnackbar } from 'notistack';
import { useCopyToClipboard } from 'react-use';

import { theme } from '@/theme';

import { ArrowDropDown } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LogoutIcon from '@mui/icons-material/Logout';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Settings from '@mui/icons-material/Settings';
import { ListItemText, useMediaQuery } from '@mui/material';
import Badge, { badgeClasses } from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { ROUTES } from '@/constants/routes';
import { useConnectedWallet } from '@/hooks/wallet/use-connected-wallet';
import { useAuth } from '@/providers/auth';
import { AvatarFile } from '@/components/atoms/avatar-file';

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
      >
        {!hideProfile && (
          <Link passHref href={ROUTES.MY_PROFILE}>
            <MenuItem
              component="a"
              key="view-profile"
              sx={{
                py: '12px',
              }}
            >
              <AccountCircleIcon color="disabled" sx={{ mr: 3.5 }} />
              <Typography textAlign="center">View my profile</Typography>
            </MenuItem>
          </Link>
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
        <MenuItem
          key="disconnect"
          onClick={withOnClose(onSignOut)}
          divider={!!address}
          sx={{
            py: '12px',
          }}
        >
          <LogoutIcon color="disabled" sx={{ mr: 3.5 }} />
          <Typography textAlign="center">Disconnect</Typography>
        </MenuItem>
        {address && (
          <ListItem
            disablePadding
            sx={{
              py: '12px',
            }}
          >
            <IconButton disabled sx={{ mr: 2.5, ml: 1 }}>
              {wallet?.adapter?.icon}
            </IconButton>

            <ListItemText
              primary={address.slice(0, 5) + '...' + address.slice(-4)}
              secondary={wallet?.chainName}
            />

            <IconButton
              sx={{ ml: 3, mr: 0.5, background: '#E5E5E529' }}
              onClick={withOnClose(copyText)}
            >
              <ContentCopyIcon
                color="disabled"
                sx={{ height: 20, width: 20, color: '#FFFFFF8F' }}
              />
            </IconButton>

            <IconButton
              sx={{ mr: 1.5, background: '#E5E5E529' }}
              href={`https://etherscan.io/address/${address}`}
              target="_blank"
            >
              <OpenInNewIcon
                sx={{ height: 20, width: 20, color: '#FFFFFF8F' }}
              />
            </IconButton>
          </ListItem>
        )}
      </Menu>
    </>
  );
}
