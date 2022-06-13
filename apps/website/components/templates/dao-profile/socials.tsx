import Link from 'next/link';
import { PropsWithChildren } from 'react';

import { PartialDeep } from 'type-fest';

import ShareIcon from '@mui/icons-material/IosShare';
import { Avatar, Stack, IconButton } from '@mui/material';

import { Daos } from '../../../services/graphql/types.generated';

type Props = {
  dao: PartialDeep<Daos>;
};

export function Socials({ dao, children }: PropsWithChildren<Props>) {
  const onShare = () => {
    const data = {
      title: `${dao.name} @ Gateway`,
      url: window.location.href,
    };
    try {
      if (navigator?.share && navigator.canShare(data)) {
        navigator.share(data);
        return;
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Stack
      direction="row"
      gap={1}
      sx={{
        mt: 4,
      }}
    >
      {children}
      <IconButton
        sx={{
          p: 0,
        }}
        onClick={onShare}
      >
        <Avatar>
          <ShareIcon
            sx={{
              mt: -0.25,
            }}
          />
        </Avatar>
      </IconButton>
      {dao.socials?.map((social) => (
        <Link href={social.url} key={social.url} passHref>
          <Avatar component="a">{social.network}</Avatar>
        </Link>
      ))}
    </Stack>
  );
}
