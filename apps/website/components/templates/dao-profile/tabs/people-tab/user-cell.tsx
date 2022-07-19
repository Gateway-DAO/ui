import { PartialDeep } from 'type-fest';

import { useMenu } from '@gateway/ui';

import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { useAuth } from '../../../../../providers/auth';
import { Users } from '../../../../../services/graphql/types.generated';
import { FollowButtonUser } from '../../../../atoms/follow-button-user';
import { AdminMenu } from './admin-menu';

type Props = {
  user: PartialDeep<Users>;
};
export function UserCell({ user }: Props) {
  const { me } = useAuth();
  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>
        <Stack alignItems="center" direction="row" gap={1}>
          <Avatar variant="circular" src={user.pfp}>
            {user.name?.[0]}
          </Avatar>
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

      <TableCell align="right">
        <Stack
          display="inline-flex"
          alignItems="center"
          direction="row"
          gap={1}
        >
          {me?.id !== user.id && (
            <FollowButtonUser
              userId={user.id}
              variant="outlined"
              size="small"
              color="secondary"
            />
          )}
          <AdminMenu user={user} />
        </Stack>
      </TableCell>
    </TableRow>
  );
}
