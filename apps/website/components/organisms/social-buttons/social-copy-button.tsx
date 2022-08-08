import Link from 'next/link';
import { useEffect, useMemo } from 'react';

import { useCopyToClipboard } from 'react-use';

import { IconButton, Avatar, Tooltip, Snackbar } from '@mui/material';

import { Network, networkValueLabelMap } from '../../../constants/dao';
import { useSnackbar } from '../../../hooks/use-snackbar';
import { User_Socials } from '../../../services/graphql/types.generated';
import { SocialIcon } from '../../atoms/social-icon';

type Props = Pick<User_Socials, 'url'> & {
  network: Network;
};

export function SocialCopyButton({ network, url }: Props) {
  const snackbar = useSnackbar();
  const [state, copyToClipboard] = useCopyToClipboard();

  const onClick = () => copyToClipboard(url);

  useEffect(() => {
    if (state?.value)
      snackbar.onOpen({ message: `Copied ${networkValueLabelMap[network]}!` });
  }, [state, network]);

  return (
    <>
      <Tooltip title={networkValueLabelMap[network]}>
        <IconButton
          sx={{
            p: 0,
          }}
          onClick={onClick}
        >
          <Avatar>
            <SocialIcon
              icon={network as Network}
              sx={{
                fontSize: '18px',
                color: '#E5E5E5',
              }}
            />
          </Avatar>
        </IconButton>
      </Tooltip>
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
