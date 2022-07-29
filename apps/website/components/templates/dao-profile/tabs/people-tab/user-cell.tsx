import Link from 'next/link';

import { PartialDeep } from 'type-fest';

import { Box, Stack, Typography } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { useAuth } from '../../../../../providers/auth';
import { Users } from '../../../../../services/graphql/types.generated';
import { AdminBadge } from '../../../../atoms/admin-badge';
import { AvatarFile } from '../../../../atoms/avatar-file';
import { FollowButtonUser } from '../../../../atoms/follow-button-user';
import { useDaoProfile } from '../../context';
import { AdminMenu } from './admin-menu';

type Props = {
  user: PartialDeep<Users>;
};
export function UserCell({ user }: Props) {
  const { me } = useAuth();
  const { isAdmin } = useDaoProfile();

  const isUserAdminOfDao =
    user.permissions?.some(({ permission }) => permission === 'dao_admin') ??
    false;

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>
        <Link href={'/profile/' + user.username} passHref>
          <Stack alignItems="center" direction="row" gap={1}>
            <AdminBadge isAdmin={isUserAdminOfDao}>
              <AvatarFile file={user.picture} fallback="/logo.png">
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
        </Link>
      </TableCell>

      {me?.id !== user.id ? (
        <>
          <TableCell align="right">
            <FollowButtonUser
              userId={user.id}
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
