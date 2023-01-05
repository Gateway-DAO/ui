import { PartialDeep } from 'type-fest';

import { TOKENS } from '@gateway/theme';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Gates } from '../../../../../services/hasura/types';
import GateRow from '../../../../molecules/gate-row';

// TODO: make it generic
// TODO: Fix Gate name column width

type TableViewProps = {
  gates: PartialDeep<Gates>[];
  isGate?: boolean;
  showStatus?: boolean;
};
export function TableView({ gates, isGate, showStatus }: TableViewProps) {
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
          {gates.map((gate) => (
            <GateRow
              key={gate.id}
              gate={gate}
              isGate={isGate}
              showStatus={showStatus}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
