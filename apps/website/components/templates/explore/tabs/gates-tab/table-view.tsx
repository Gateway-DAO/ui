import { Avatar, Box, Chip, Stack, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Gates } from '../../../../../services/graphql/types.generated';
import { badgeProps } from '../../../../../utils/badge-props';

// TODO: make it generic
// TODO: Fix Gate name column width

type Props = {
  gates: Gates[];
};
export function TableView({ gates }: Props) {
  return (
    <TableContainer>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Gate</TableCell>
            <TableCell align="left">Category</TableCell>
            <TableCell align="left">Dao</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gates.map((gate) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={gate.id}>
                <TableCell>
                  <Stack alignItems="center" direction="row" gap={1}>
                    <Avatar variant="rounded" {...badgeProps(gate.badge)}>
                      {gate.gate_name?.[0]}
                    </Avatar>
                    <Box>
                      <Typography>{gate.gate_name}</Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {gate.description}
                      </Typography>
                    </Box>
                  </Stack>
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
                <TableCell>
                  <Stack alignItems="center" direction="row" gap={1}>
                    <Avatar
                      src={gate.dao.logo_url}
                      sx={{ width: 32, height: 32 }}
                      aria-label={gate.dao.name}
                    >
                      {gate.dao.name?.[0]}
                    </Avatar>
                    {gate.dao.name}
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
