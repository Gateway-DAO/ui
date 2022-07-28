import Link from 'next/link';

import { PartialDeep } from 'type-fest';

import { Box, SxProps, IconButton, Avatar } from '@mui/material';

import { Network } from '../../../constants/dao';
import { User_Socials } from '../../../services/graphql/types.generated';
import { SocialIcon } from '../../atoms/social-icon';

type Props = {
  socials: PartialDeep<User_Socials>[];
  sx?: SxProps;
};

export function SocialButtons({ socials }: Props) {
  return (
    <Box>
      {socials.map(({ network, url }) => (
        <Link href={url} key={network} passHref>
          <IconButton
            sx={{
              p: 0,
              mr: 1,
            }}
            component="a"
            target="_blank"
          >
            <Avatar>
              <SocialIcon
                icon={network as Network}
                sx={{
                  fontSize: '18px',
                  marginTop: '0px',
                  color: '#E5E5E5',
                }}
              />
            </Avatar>
          </IconButton>
        </Link>
      ))}
    </Box>
  );
}
