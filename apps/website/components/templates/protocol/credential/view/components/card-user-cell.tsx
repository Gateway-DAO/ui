import { PartialDeep } from 'type-fest';

import { Stack, Link } from '@mui/material';

import { User } from '../../../../../../services/gateway-protocol/types';
import { AvatarFile } from '../../../../../atoms/avatar-file';
import CardCell from './card-cell';

type Props = {
  label: string;
  user: PartialDeep<User>;
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
        file={'test' as any}
        fallback="/avatar.png"
        sx={{ ml: alignRight ? 0 : 2, mr: alignRight ? 2 : 0 }}
      >
        {'Teste'}
      </AvatarFile>
      <CardCell label={label} margin={false} alignRight={alignRight}>
        <Link
          href={`http://localhost:4200/${user?._id}`}
          sx={{ textDecoration: 'none' }}
        >
          {user?.primaryWallet?.address}
        </Link>
      </CardCell>
    </Stack>
  );
}
