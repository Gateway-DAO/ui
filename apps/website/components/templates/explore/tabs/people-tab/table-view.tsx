import Link from 'next/link';

import { TOKENS } from '@gateway/theme';

import { Box, Stack, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { ROUTES } from '../../../../../constants/routes';
import { useAuth } from '../../../../../providers/auth';
import { AvatarFile } from '../../../../atoms/avatar-file';
import { FollowButtonUser } from '../../../../atoms/follow-button-user';
import { ExploreProps } from '../../types';

type Props = {
  people: ExploreProps['people'];
};
export function TableView({ people }: Props) {
  const { me } = useAuth();

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
                <Link
                  passHref
                  href={ROUTES.PROFILE.replace('[username]', user.username)}
                >
                  <TableCell sx={{ cursor: 'pointer' }}>
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
                      userId={user.id}
                      variant="outlined"
                      size="small"
                      color="secondary"
                    />
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
