import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';

import { useCopyToClipboard } from 'react-use';

import { useMenu } from '@gateway/ui';

import {
  IosShare,
  Reddit,
  Twitter,
  Facebook,
  Link as LinkIcon,
} from '@mui/icons-material';
import {
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Snackbar,
} from '@mui/material';

import { useSnackbar } from '../../hooks/use-snackbar';
import objectToParams from '../../utils/map-object';

type Props = {
  title?: string;
  url?: string;
};

const tweetLink = (props: Props) =>
  `https://twitter.com/intent/tweet${objectToParams({
    text: props.title,
    url: props.url,
  })}`;

const redditLink = (props: Props) =>
  `https://reddit.com/submit${objectToParams(props)}`;

const facebookLink = (props: Props) =>
  `https://www.facebook.com/sharer/sharer.php${objectToParams({
    u: props.url,
    quote: props.title,
  })}`;

export function ShareButton({
  title = 'Gateway',
  url = window.location.href,
}: Props) {
  const snackbar = useSnackbar();
  const [state, copyToClipboard] = useCopyToClipboard();
  const menu = useMenu();
  const data = { title, url };
  const { t } = useTranslation('common');
  const onShare = () => {
    try {
      if (navigator?.share && navigator.canShare(data)) {
        navigator.share(data);
      } else {
        copyToClipboard(data.url);
      }
    } catch (e) {
      console.error(e);
    } finally {
      menu.onClose();
    }
  };

  useEffect(() => {
    if (state?.value) snackbar.onOpen({ message: 'Copied link!' });
  }, [state]);

  return (
    <>
      <IconButton
        sx={{
          p: 0,
        }}
        onClick={menu.onOpen}
        key="share"
      >
        <Avatar>
          <IosShare
            sx={{
              mt: -0.25,
            }}
          />
        </Avatar>
      </IconButton>
      <Menu anchorEl={menu.element} open={menu.isOpen} onClose={menu.onClose}>
        <MenuItem component="a" href={tweetLink(data)} target="_blank">
          <ListItemIcon>
            <Twitter />
          </ListItemIcon>
          <ListItemText>Twitter</ListItemText>
        </MenuItem>
        <MenuItem component="a" href={facebookLink(data)} target="_blank">
          <ListItemIcon>
            <Facebook />
          </ListItemIcon>
          <ListItemText>Facebook</ListItemText>
        </MenuItem>
        <MenuItem component="a" href={redditLink(data)} target="_blank">
          <ListItemIcon>
            <Reddit />
          </ListItemIcon>
          <ListItemText>Reddit</ListItemText>
        </MenuItem>
        <MenuItem onClick={onShare}>
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
          <ListItemText>{t('actions.share-link')}</ListItemText>
        </MenuItem>
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
