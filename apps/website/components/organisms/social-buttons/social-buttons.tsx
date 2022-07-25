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
        <IconButton
          key={network}
          sx={{
            p: 0,
            mr: 1,
          }}
          onClick={() => window.open(url, '_blank')}
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
      ))}
    </Box>
  );
}
