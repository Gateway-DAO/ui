import { PartialObjectDeep } from 'type-fest/source/partial-deep';

import { Stack, Link } from '@mui/material';

import { Users } from '../../../../../../services/hasura/types';
import { AvatarFile } from '../../../../../atoms/avatar-file';
import CardCell from './card-cell';

type Props = {
  label: string;
  user: PartialObjectDeep<Users>;
  alignRight?: boolean;
};

export default function CardUserCell({
  label,
  user,
  alignRight = false,
}: Props) {
  return (
    <Stack
      sx={{
        flexDirection: alignRight ? 'row-reverse' : 'row',
        alignItems: 'center',
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
        <Link
          href={`http://localhost:4200/${user?.username}`}
          sx={{ textDecoration: 'none' }}
        >
          {user?.wallet}
        </Link>
      </CardCell>
    </Stack>
  );
}
