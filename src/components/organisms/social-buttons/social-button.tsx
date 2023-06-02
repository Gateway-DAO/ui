import { useMemo } from 'react';

import { SocialIcon } from '@/components/atoms/social-icon';
import { Network, networkValueLabelMap } from '@/constants/dao';
import { User_Socials } from '@/services/hasura/types';

import { IconButton, Avatar, Tooltip } from '@mui/material';

type Props = Pick<User_Socials, 'url'> & {
  network: Network;
};

export function SocialButton({ network, url: urlProp }: Props) {
  const avatar = (
    <Avatar>
      <SocialIcon
        icon={network as Network}
        sx={{
          fontSize: '18px',
          color: '#E5E5E5',
        }}
      />
    </Avatar>
  );

  const url = useMemo(() => {
    if (network === 'email') {
      return `mailto:${urlProp}`;
    }
    return urlProp;
  }, [urlProp, network]);

  return (
    <Tooltip title={networkValueLabelMap[network]} key={url + network}>
      <IconButton
        sx={{
          p: 0,
        }}
        component="a"
        target="_blank"
        href={url}
      >
        {avatar}
      </IconButton>
    </Tooltip>
  );
}
