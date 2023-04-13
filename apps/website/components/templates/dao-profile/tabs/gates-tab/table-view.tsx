import { PartialDeep } from 'type-fest';

import { TOKENS } from '@gateway/theme';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Gates, Loyalty_Program } from '../../../../../services/hasura/types';
import GateRow from '../../../../molecules/gate-row';

// TODO: make it generic
// TODO: Fix Gate name column width

type TableViewProps = {
  data: PartialDeep<Gates>[] | PartialDeep<Loyalty_Program>[];
  isPass?: boolean;
  isGate?: boolean;
  showStatus?: boolean;
};
export function TableView({ data, isGate, showStatus }: TableViewProps) {
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
            <TableCell align="left">Gate</TableCell>
            {isGate && showStatus && <TableCell align="left">Status</TableCell>}
            <TableCell align="left">Category</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <GateRow
              key={item.id}
              gate={item}
              isGate={isGate}
              showStatus={showStatus}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
