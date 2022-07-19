import { PartialDeep } from 'type-fest';

import { TOKENS } from '@gateway/theme';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Users } from '../../../../../services/graphql/types.generated';
import { UserCell } from './user-cell';

type Props = {
  people: PartialDeep<Users>[];
};

export function TableView({ people }: Props) {
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
            return <UserCell key={user.id} user={user}></UserCell>;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
