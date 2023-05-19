import Link from 'next/link';
import { PropsWithChildren } from 'react';

import { Stack, SxProps, IconButton, Avatar } from '@mui/material';

import { Network } from '@/constants/dao';
import { User_Socials } from '@/services/hasura/types';
import { SocialIcon } from '../../atoms/social-icon';
import { SocialButton } from './social-button';
import { SocialCopyButton } from './social-copy-button';

type Props = {
  socials: Partial<Pick<User_Socials, 'network' | 'url'>>[];
  /* networks that will render as click to copy instead of a link */
  copyNetworks?: Network[];
  sx?: SxProps;
};

export function SocialButtons({
  socials,
  sx,
  children,
  copyNetworks = [],
}: PropsWithChildren<Props>) {
  return (
    <Stack direction="row" gap={1} sx={sx}>
      {children}
      {socials.map(({ network, url }) =>
        copyNetworks.includes(network as Network) ? (
          <SocialCopyButton
            key={url + network}
            network={network as Network}
            url={url}
          />
        ) : (
          <SocialButton
            key={url + network}
            network={network as Network}
            url={url}
          />
        )
      )}
    </Stack>
  );
}
