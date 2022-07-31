import { PropsWithChildren } from 'react';

import { PartialDeep } from 'type-fest';

import { Avatar, Stack } from '@mui/material';

import { Network } from '../../../constants/dao';
import { Daos } from '../../../services/graphql/types.generated';
import { ShareButton } from '../../atoms/share-button';
import { SocialIcon } from '../../atoms/social-icon';

type Props = {
  dao: PartialDeep<Daos>;
};

export function Socials({ dao, children }: PropsWithChildren<Props>) {
  return (
    <>
      <Stack
        direction="row"
        gap={1}
        sx={{
          mt: 4,
        }}
      >
        {children}
        <ShareButton title={`${dao.name} @ Gateway`} />
        {dao.socials?.map((social) => (
          <Avatar
            component="a"
            title={social.network}
            href={social.url}
            key={social.url + social.network}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialIcon icon={social.network as Network} />
          </Avatar>
        ))}
      </Stack>
    </>
  );
}
