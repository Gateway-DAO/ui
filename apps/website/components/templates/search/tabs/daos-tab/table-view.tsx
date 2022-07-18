import useTranslation from 'next-translate/useTranslation';

import { PartialDeep } from 'type-fest';

import { TOKENS } from '@gateway/theme';

import { Avatar, Box, Chip, Stack, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Daos } from '../../../../../services/graphql/types.generated';
import { FollowButtonDAO } from '../../../../atoms/follow-button-dao';

type Props = {
  daos: PartialDeep<Daos>[];
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
                        {dao.description.length > 140
                          ? `${dao.description.slice(0, 139)}...`
                          : dao.description}
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
                  <FollowButtonDAO
                    daoId={dao.id}
                    variant="outlined"
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
