import { PartialObjectDeep } from 'type-fest/source/partial-deep';

import { Stack, Link, Typography } from '@mui/material';

import { Users } from '../../../../../../services/hasura/types';
import { AvatarFile } from '../../../../../atoms/avatar-file';
import CardCell from './card-cell';

type Props = {
  label: string;
  user: PartialObjectDeep<Users>;
  hasLink?: boolean;
  alignRight?: boolean;
};

export default function CardUserCell({
  label,
  user,
  alignRight = false,
  hasLink = false,
}: Props) {
  const name = user?.username ?? user?.ens ?? user?.wallet;

  return (
    <Stack
      sx={{
        flexDirection: alignRight ? 'row-reverse' : 'row',
        alignItems: 'center',
        flexBasis: '100%',
      }}
    >
      <AvatarFile
        file={user?.picture}
        fallback="/avatar.png"
        sx={{ ml: alignRight ? 0 : 2, mr: alignRight ? 2 : 0 }}
      >
        {user?.username}
      </AvatarFile>
      <CardCell label={label} margin={false} alignRight={alignRight}>
        {hasLink ? (
          <Link
            href={`http://localhost:4200/${user?.username}`}
            sx={{ textDecoration: 'none' }}
          >
            {name}
          </Link>
        ) : (
          <Typography variant="body2">{name}</Typography>
        )}
      </CardCell>
    </Stack>
  );
}
