import { useEffect } from 'react';

import { SocialIcon } from '@/components/atoms/icons/social-icon';
import { Network, networkValueLabelMap } from '@/constants/dao';
import { User_Socials } from '@/services/hasura/types';
import { useSnackbar } from 'notistack';
import { useCopyToClipboard } from 'react-use';

import { IconButton, Avatar, Tooltip } from '@mui/material';

type Props = Pick<User_Socials, 'url'> & {
  network: Network;
};

export function SocialCopyButton({ network, url }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [state, copyToClipboard] = useCopyToClipboard();

  const onClick = () => copyToClipboard(url);

  useEffect(() => {
    if (state?.value) {
      enqueueSnackbar(`Copied to clipboard!`);
    }
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
    </>
  );
}
