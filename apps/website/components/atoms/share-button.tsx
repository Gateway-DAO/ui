import { useEffect } from 'react';

import { useCopyToClipboard } from 'react-use';

import ShareIcon from '@mui/icons-material/IosShare';
import { Avatar, IconButton, Snackbar } from '@mui/material';

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
