import useTranslation from 'next-translate/useTranslation';

import { useMutation, useQueryClient } from 'react-query';

import { TOKENS } from '@gateway/theme';

import { Avatar, Box, Button, Chip, Stack, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useProtected } from '../../../../../hooks/use-protected';
import { useAuth } from '../../../../../providers/auth';
import { gqlMethods } from '../../../../../services/api';
import { SessionUser } from '../../../../../types/user';
import { ExploreProps } from '../../types';

type Props = {
  people: ExploreProps['people'];
};
export function TableView({ people }: Props) {
  const { me } = useAuth();
  const queryClient = useQueryClient();

  const { t } = useTranslation('common');

  const follow = useMutation(
    (id: string) => gqlMethods(me).follow_user({ id }),
    {
      onSuccess({ follow_user }) {
        queryClient.setQueryData('me', (user: SessionUser) => ({
          ...user,
          following: [...user.following, follow_user],
        }));
      },
    }
  );

  const isLoading = follow.isLoading;

  const onFollow = useProtected((id: string) => {
    follow.mutate(id);
  });

  const onToggleFollow = (id: string) => () => {
    onFollow(id);
  };

  return (
    <TableContainer
      sx={{
        '& .MuiTableCell-root:first-of-type': {
          pl: TOKENS.CONTAINER_PX,
        },
        '& .MuiTableCell-root:last-of-type': {
          pr: TOKENS.CONTAINER_PX,
        },
      }}
    >
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {people.map((user) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
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
                  <Button
                    disabled={isLoading && follow.variables === user.id}
                    variant="outlined"
                    color="secondary"
                    onClick={onToggleFollow(user.id)}
                  >
                    {me?.following?.find(
                      (following) => following.user_id === user.id
                    )
                      ? t('actions.unfollow')
                      : t('actions.follow')}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
