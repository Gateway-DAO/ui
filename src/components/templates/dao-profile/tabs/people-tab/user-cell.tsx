import dynamic from 'next/dynamic';
import Link from 'next/link';

import { PartialDeep } from 'type-fest';

import { Box, Stack, Typography } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/providers/auth';
import { Users } from '@/services/hasura/types';
import { AdminBadge } from '@/components/atoms/admin-badge';
import { AvatarFile } from '@/components/atoms/avatar-file';
import { useDaoProfile } from '../../context';
import { AdminMenu } from './admin-menu';

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
  const { isAdmin } = useDaoProfile();

  const isUserAdminOfDao =
    user.permissions?.some(({ permission }) => permission === 'dao_admin') ??
    false;

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
            <AdminBadge isAdmin={isUserAdminOfDao}>
              <AvatarFile file={user.picture} fallback="/avatar.png">
                {user.name?.[0]}
              </AvatarFile>
            </AdminBadge>
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

      {me?.id !== user.id ? (
        <>
          <TableCell align="right">
            <FollowButtonUser
              wallet={user.wallet}
              variant="outlined"
              size="small"
              color="secondary"
            />
          </TableCell>
          <TableCell align="right">
            {isAdmin && <AdminMenu user={user} />}
          </TableCell>
        </>
      ) : (
        <>
          <TableCell /> <TableCell />
        </>
      )}
    </TableRow>
  );
}
