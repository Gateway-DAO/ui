import { TOKENS } from '@gateway/theme';

import { Avatar, Box, Button, Chip, Stack, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { ExploreProps } from '../../types';

// TODO: make it generic
// TODO: Fix Dao name column width

type Props = {
  daos: ExploreProps['daos'];
};
export function TableView({ daos }: Props) {
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
            <TableCell align="left">Dao</TableCell>
            <TableCell align="left">Category</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {daos.map((dao) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={dao.id}>
                <TableCell>
                  <Stack alignItems="center" direction="row" gap={1}>
                    <Avatar variant="circular" src={dao.logo_url}>
                      {dao.name?.[0]}
                    </Avatar>
                    <Box>
                      <Typography>{dao.name}</Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {dao.description}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" gap={1}>
                    {dao.categories?.map((category) => (
                      <Chip
                        key={`dao-${dao.id}-category-${category}`}
                        label={category}
                      />
                    ))}
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
