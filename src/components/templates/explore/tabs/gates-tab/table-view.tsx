import Link from 'next/link';

import { TOKENS } from '@/theme';

import { Avatar, Box, Chip, Stack, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { ROUTES } from '@/constants/routes';
import { badgeProps } from '@/utils/badge-props';
import { ExploreProps } from '../../types';

// TODO: make it generic
// TODO: Fix Gate name column width

type Props = {
  gates: ExploreProps['gates'];
};
export function TableView({ gates }: Props) {
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
            <TableCell align="left">Category</TableCell>
            <TableCell align="left">Dao</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gates.map((gate) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={gate.id}>
                <Link
                  passHref
                  href={ROUTES.GATE_PROFILE.replace('[id]', gate.id)}
                >
                  <TableCell sx={{ cursor: 'pointer' }}>
                    <Stack alignItems="center" direction="row" gap={1}>
                      <Avatar variant="rounded" {...badgeProps(gate)}>
                        {gate.title?.[0]}
                      </Avatar>
                      <Box>
                        <Typography>{gate.title}</Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={(theme) => ({
                            display: 'block',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            maxWidth: '70ch',
                            [`${theme.breakpoints.down('md')}`]: {
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                            },
                          })}
                        >
                          {gate.description.length > 140
                            ? `${gate.description.slice(0, 139)}...`
                            : gate.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                </Link>
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
                      src={gate?.dao?.logo_url}
                      sx={{ width: 32, height: 32 }}
                      aria-label={gate?.dao?.name}
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
