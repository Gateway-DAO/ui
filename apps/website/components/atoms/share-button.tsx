import { useState } from 'react';

import {
  AiFillRedditCircle,
  AiOutlineCopy,
  AiOutlineTwitter,
} from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';

import ShareIcon from '@mui/icons-material/IosShare';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
} from '@mui/material';

export function ShareButton({ title }) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const onShare = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShare = (e) => {
    e.preventDefault();

    const url = window.location.href;
    const encodedAhref = encodeURIComponent(url);
    let link;

    switch (e.currentTarget.id) {
      case 'email':
        link = `mailto:?subject=${title}&amp;body=${encodedAhref}`;
        openLink(link);
        break;

      case 'reddit':
        link = `https://www.reddit.com/submit?url=${encodedAhref}`;
        openLink(link);
        break;

      case 'twitter':
        link = `https://twitter.com/intent/tweet?url=${encodedAhref}`;
        openLink(link);
        break;

      case 'copy':
        navigator.clipboard.writeText(url);
        break;

      default:
        break;
    }
  };

  const openLink = (socialLink) => {
    window.open(socialLink, '_blank');
  };

  const open = Boolean(anchorEl);
  const id = open ? 'share-popover' : undefined;

  return (
    <>
      <IconButton
        sx={{
          p: 0,
        }}
        onClick={onShare}
        key="share"
      >
        <Avatar>
          <ShareIcon
            sx={{
              mt: -0.25,
            }}
          />
        </Avatar>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List sx={{ minWidth: '200px' }}>
          <ListItem
            button
            style={{ paddingTop: '.75em' }}
            id="email"
            onClick={handleShare}
          >
            <ListItemIcon>
              <MdEmail />
            </ListItemIcon>
            <ListItemText primary="Email" />
          </ListItem>
          <ListItem
            button
            style={{ paddingTop: '.75em' }}
            id="reddit"
            onClick={handleShare}
          >
            <ListItemIcon>
              <AiFillRedditCircle />
            </ListItemIcon>
            <ListItemText primary="Reddit" />
          </ListItem>
          <ListItem
            button
            style={{ paddingTop: '.75em' }}
            id="twitter"
            onClick={handleShare}
          >
            <ListItemIcon>
              <AiOutlineTwitter />
            </ListItemIcon>
            <ListItemText primary="Twitter" />
          </ListItem>
          <ListItem
            button
            style={{ paddingTop: '.75em' }}
            id="copy"
            onClick={handleShare}
          >
            <ListItemIcon>
              <AiOutlineCopy />
            </ListItemIcon>
            <ListItemText primary="Copy link" />
          </ListItem>
        </List>
      </Popover>
    </>
  );
}
