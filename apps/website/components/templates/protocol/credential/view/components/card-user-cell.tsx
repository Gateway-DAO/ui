import { Stack, Link } from '@mui/material';

import { AvatarFile } from '../../../../../atoms/avatar-file';
import { MockEntity } from '../credential-view';
import CardCell from './card-cell';

type Props = {
  label: string;
  user: MockEntity;
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
        file={user?.avatar}
        fallback="/avatar.png"
        sx={{ ml: alignRight ? 0 : 2, mr: alignRight ? 2 : 0 }}
      >
        {user?.username}
      </AvatarFile>
      <CardCell label={label} margin={false} alignRight={alignRight}>
        <Link
          href={`http://localhost:4200/${user?.id}`}
          sx={{ textDecoration: 'none' }}
        >
          {user?.wallet}
        </Link>
      </CardCell>
    </Stack>
  );
}
