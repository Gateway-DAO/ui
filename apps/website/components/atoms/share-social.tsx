import { useEffect, useState } from 'react';

import { FaDiscord } from 'react-icons/fa';
import { useCopyToClipboard } from 'react-use';

import EmailIcon from '@mui/icons-material/Email';
import ShareIcon from '@mui/icons-material/IosShare';
import RedditIcon from '@mui/icons-material/Reddit';
import TwitterIcon from '@mui/icons-material/Twitter';
import {
  Avatar,
  IconButton,
  Snackbar,
  Menu,
  MenuItem,
  Badge,
  Typography,
} from '@mui/material';

import { useSnackbar } from '../../hooks/use-snackbar';

type Props = {
  title?: string;
  url?: string;
};

export function ShareButton({ title, url }: Props) {
  const snackbar = useSnackbar();
  const [state, copyToClipboard] = useCopyToClipboard();
  const onShare = () => {
    const data = {
      title: title ?? `Gateway`,
      url: url ?? window.location.href,
    };
    try {
      if (navigator?.share && navigator.canShare(data)) {
        navigator.share(data);
      } else {
        copyToClipboard(data.url);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (state?.value) snackbar.onOpen({ message: 'Copied link!' });
  }, [state]);

  //Menu functions
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleShare = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        sx={{
          p: 0,
        }}
        onClick={handleShare}
        key="share"
      >
        <Avatar sx={{ width: '32px', height: '32px' }}>
          <ShareIcon
            sx={{
              mt: -0.25,
              fontSize: '18px',
              color: '#E5E5E5',
            }}
          />
        </Avatar>
      </IconButton>
      <Snackbar
        anchorOrigin={{
          vertical: snackbar.vertical,
          horizontal: snackbar.horizontal,
        }}
        open={snackbar.open}
        onClose={snackbar.handleClose}
        message={snackbar.message}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          marginTop: '16px',
          '& .MuiPaper-root': {
            width: '234px',
          },
        }}
      >
        <Typography
          textAlign="left"
          sx={{
            fontSize: '12px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.7)',
            margin: '8px 8px 14px 16px',
          }}
        >
          Share on
        </Typography>
        <MenuItem
          key="email"
          onClick={(e) => {
            window.location.href = 'mailto:xyz@yourapplicationdomain.com';
            e.preventDefault();
          }}
        >
          <Badge
            overlap="circular"
            sx={{
              display: 'block',
              margin: '0px 32px 0px 0px',
            }}
          >
            <Avatar sx={{ background: 'rgba(229, 229, 229, 0.16)' }}>
              <EmailIcon></EmailIcon>
            </Avatar>
          </Badge>
          <Typography textAlign="center">E-mail</Typography>
        </MenuItem>
        <MenuItem key="reddit" onClick={() => alert('reddit')}>
          <Badge
            overlap="circular"
            sx={{ display: 'block', margin: '0px 32px 0px 0px' }}
          >
            <Avatar sx={{ background: 'rgba(229, 229, 229, 0.16)' }}>
              <RedditIcon></RedditIcon>
            </Avatar>
          </Badge>
          <Typography textAlign="center">Reddit</Typography>
        </MenuItem>
        <MenuItem key="twitter" onClick={() => alert('twitter')}>
          <Badge
            overlap="circular"
            sx={{ display: 'block', margin: '0px 32px 0px 0px' }}
          >
            <Avatar sx={{ background: 'rgba(229, 229, 229, 0.16)' }}>
              <TwitterIcon></TwitterIcon>
            </Avatar>
          </Badge>
          <Typography textAlign="center">Twitter</Typography>
        </MenuItem>
        <MenuItem key="discord" onClick={() => alert('discord')}>
          <Badge
            overlap="circular"
            sx={{ display: 'block', margin: '0px 32px 0px 0px' }}
          >
            <Avatar sx={{ background: 'rgba(229, 229, 229, 0.16)' }}>
              <FaDiscord />
            </Avatar>
          </Badge>
          <Typography textAlign="center">Discord</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
