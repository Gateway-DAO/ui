import useTranslation from 'next-translate/useTranslation';

import { TOKENS } from '@gateway/theme';

import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useFollowUser } from '../../../../../hooks/use-follow';
import { ExploreProps } from '../../types';

type Props = {
  people: ExploreProps['people'];
};
export function TableView({ people }: Props) {
  const { t } = useTranslation('common');

  const { isFollowingUser, onToggleFollow, isLoading } = useFollowUser();

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
            const isFollowing = isFollowingUser(user.id);
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
                    disabled={isLoading(user.id)}
                    variant="outlined"
                    color="secondary"
                    onClick={() => onToggleFollow(user.id, isFollowing)}
                  >
                    {isFollowing ? t('actions.unfollow') : t('actions.follow')}
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
