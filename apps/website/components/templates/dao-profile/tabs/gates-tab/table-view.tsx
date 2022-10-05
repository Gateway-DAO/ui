import { PartialDeep } from 'type-fest';

import { TOKENS } from '@gateway/theme';

import { Avatar, Box, Chip, Stack, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import GateStateChip from '../../../../../components/atoms/gate-state-chip';
import { ReadMore } from '../../../../../components/atoms/read-more-less';
import { Gates } from '../../../../../services/graphql/types.generated';
import { badgeProps } from '../../../../../utils/badge-props';

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
          </TableRow>
        </TableHead>
        <TableBody>
          {gates.map((gate) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={gate.id}>
                <TableCell>
                  <Stack alignItems="center" direction="row" gap={1}>
                    <Avatar variant="rounded" {...badgeProps(gate)}>
                      {gate.title?.[0]}
                    </Avatar>
                    <Box>
                      <Typography>{gate.title}</Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          whiteSpace: 'break-word',
                        }}
                      >
                        {gate.description.length > 100 ? (
                          <ReadMore>{gate.description}</ReadMore>
                        ) : (
                          gate.description
                        )}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  {isGate && showStatus && (
                    <GateStateChip published={gate.published} />
                  )}
                </TableCell>
                <TableCell>
                  <Stack direction="row" gap={1}>
                    {gate.categories?.map((category) => (
                      <Chip
                        key={`gate-${gate.id}-category-${category}`}
                        label={category}
                      />
                    ))}
                  </Stack>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
