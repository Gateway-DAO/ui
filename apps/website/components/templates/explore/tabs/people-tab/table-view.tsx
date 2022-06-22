import { TOKENS } from '@gateway/theme';

import { Avatar, Box, Button, Chip, Stack, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { ExploreProps } from '../../types';

type Props = {
  people: ExploreProps['people'];
};
export function TableView({ people }: Props) {
  return (
    <TableContainer sx={{ px: TOKENS.CONTAINER_PX }}>
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
                    <Avatar variant="rounded" src={user.pfp}>
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
                  <Button variant="outlined" color="secondary">
                    Follow
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
