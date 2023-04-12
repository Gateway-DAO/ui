import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';

import { useSnackbar } from 'notistack';
import { useCopyToClipboard } from 'react-use';

import {
  Reddit,
  Twitter,
  Facebook,
  Link as LinkIcon,
} from '@mui/icons-material';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';

import objectToParams from '../../utils/map-object';

type Props = {
  title?: string;
  url?: string;
  description?: string;
  menu: {
    element: HTMLElement;
    isOpen: boolean;
    onOpen: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onClose: () => void;
    withOnClose: (cb: () => void) => () => void;
  };
};

type SocialProps = {
  title?: string;
  url?: string;
  description?: string;
};

const tweetLink = (props: SocialProps) =>
  `https://twitter.com/intent/tweet${objectToParams({
    text: props.title + ' ' + props.description,
    url: props.url,
  })}`;

const redditLink = (props: SocialProps) =>
  `https://reddit.com/submit${objectToParams(props)}`;

const facebookLink = (props: SocialProps) =>
  `https://www.facebook.com/sharer/sharer.php${objectToParams({
    u: props.url,
    quote: props.title,
  })}`;

export function ShareButtonFn({
  title = 'Gateway_xyz',
  url = typeof window !== 'undefined' ? window.location.href : '',
  menu,
  description = 'Got my hands on credential',
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [state, copyToClipboard] = useCopyToClipboard();
  const data = { title, url, description };
  
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
    if (state?.value) {
      enqueueSnackbar('Copied link!');
    }
  }, [state]);

  return (
    <>
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
    </>
  );
}
