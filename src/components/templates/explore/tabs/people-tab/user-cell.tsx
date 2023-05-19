import dynamic from 'next/dynamic';
import Link from 'next/link';

import { AvatarFile } from '@/components/atoms/avatar-file';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/providers/auth';
import { Users } from '@/services/hasura/types';
import { PartialDeep } from 'type-fest';

import { Typography, TableRow, TableCell, Stack } from '@mui/material';
import { Box } from '@mui/system';

const FollowButtonUser = dynamic<any>(
  () =>
    import('@/components/atoms/follow-button-user').then(
      (mod) => mod.FollowButtonUser
    ),
  {
    ssr: false,
  }
);
type Props = {
  user: PartialDeep<Users>;
  size: number;
  start: number;
};

export function UserCell({ user, size, start }: Props) {
  const { me } = useAuth();
  return (
    <TableRow
      hover
      role="checkbox"
      tabIndex={-1}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: `${size}px`,
        transform: `translateY(${start}px)`,
      }}
    >
      <Link passHref href={ROUTES.PROFILE.replace('[username]', user.username)}>
        <TableCell sx={{ cursor: 'pointer', width: '100%' }}>
          <Stack alignItems="center" direction="row" gap={1}>
            <AvatarFile file={user.picture} fallback="/logo.png">
              {user.name?.[0]}
            </AvatarFile>
            <Box>
              <Typography>{user.name}</Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                @{user.username}
              </Typography>
            </Box>
          </Stack>
        </TableCell>
      </Link>

      <TableCell align="right">
        {user.id !== me?.id && (
          <FollowButtonUser
            wallet={user.wallet}
            variant="outlined"
            size="small"
            color="secondary"
          />
        )}
      </TableCell>
    </TableRow>
  );
}
