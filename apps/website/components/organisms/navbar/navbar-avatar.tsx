import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useCopyToClipboard } from 'react-use';
import { useAccount, useNetwork } from 'wagmi';

import { useMenu } from '@gateway/ui';

import { ArrowDropDown } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LogoutIcon from '@mui/icons-material/Logout';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ListItemText } from '@mui/material';
import Badge, { badgeClasses } from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { ROUTES } from '../../../constants/routes';
import { useSnackbar } from '../../../hooks/use-snackbar';
import { useAuth } from '../../../providers/auth';
import { AvatarFile } from '../../atoms/avatar-file';
import { icons } from './wallet-icons';

/* TODO: Refactor */

type Props = {
  hideProfile?: boolean;
};

export function NavBarAvatar({ hideProfile }: Props) {
  const { element, isOpen, onClose, onOpen, withOnClose } = useMenu();
  const router = useRouter();
  const { data: accountDetail } = useAccount();
  const { activeChain } = useNetwork();
  const { onSignOut, me } = useAuth();
  const snackbar = useSnackbar();
  const [state, copyToClipboard] = useCopyToClipboard();

  useEffect(() => {
    if (state?.value) snackbar.onOpen({ message: 'Copied Wallet Address!' });
  }, [state]);

  const copyText = () => {
    copyToClipboard(accountDetail?.address);
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
              fallback={'/logo.png'}
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
        {/* <NestedMenuItem label="Languages" parentMenuOpen={isOpen}>
          <MenuItem onClick={onChangeLanguage('en')}>English</MenuItem>
          <MenuItem onClick={onChangeLanguage('pt-BR')}>
            Portuguese (Brazil)
          </MenuItem>
        </NestedMenuItem> */}
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
        <MenuItem
          key="disconnect"
          onClick={withOnClose(onSignOut)}
          divider={!!accountDetail?.address}
          sx={{
            py: '12px',
          }}
        >
          <LogoutIcon color="disabled" sx={{ mr: 3.5 }} />
          <Typography textAlign="center">Disconnect</Typography>
        </MenuItem>
        {accountDetail?.address && (
          <ListItem
            disablePadding
            sx={{
              py: '12px',
            }}
          >
            <IconButton disabled sx={{ mr: 2.5, ml: 1 }}>
              {!!accountDetail?.connector?.id &&
                icons[accountDetail.connector?.id]}
            </IconButton>

            <ListItemText
              primary={
                accountDetail?.address.slice(0, 5) +
                '...' +
                accountDetail?.address.slice(-4)
              }
              secondary={activeChain?.name}
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
              href={`https://etherscan.io/address/${accountDetail?.address}`}
              target="_blank"
            >
              <OpenInNewIcon
                sx={{ height: 20, width: 20, color: '#FFFFFF8F' }}
              />
            </IconButton>
          </ListItem>
        )}
      </Menu>
      <Snackbar
        anchorOrigin={{
          vertical: snackbar.vertical,
          horizontal: snackbar.horizontal,
        }}
        open={snackbar.open}
        onClose={snackbar.handleClose}
        message={snackbar.message}
      />
    </>
  );
}
