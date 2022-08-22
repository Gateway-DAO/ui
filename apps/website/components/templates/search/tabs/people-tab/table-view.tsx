import { useRouter } from 'next/router';

import { PartialDeep } from 'type-fest';

import { TOKENS } from '@gateway/theme';

import { Avatar, Box, Stack, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { ROUTES } from '../../../../../constants/routes';
import { Users } from '../../../../../services/graphql/types.generated';
import { FollowButtonUser } from '../../../../atoms/follow-button-user';

type Props = {
  people: PartialDeep<Users>[];
};

// TODO: improve TableCell click behavior and UX
export function TableView({ people }: Props) {
  const router = useRouter();

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
                <TableCell
                  onClick={() =>
                    router.push({
                      pathname: ROUTES.PROFILE,
                      query: {
                        username: user.username,
                      },
                    })
                  }
                  sx={{
                    cursor: 'pointer',
                  }}
                >
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
                  <FollowButtonUser
                    wallet={user.wallet}
                    variant="outlined"
                    size="small"
                    color="secondary"
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
