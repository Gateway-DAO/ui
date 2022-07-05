import useTranslation from 'next-translate/useTranslation';

import { TOKENS } from '@gateway/theme';

import { Avatar, Box, Button, Chip, Stack, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useFollowDAO } from '../../../../../hooks/use-follow';
import { ExploreProps } from '../../types';

// TODO: make it generic
// TODO: Fix Dao name column width

type Props = {
  daos: ExploreProps['daos'];
};
export function TableView({ daos }: Props) {
  const { t } = useTranslation('common');
  const { isFollowingDAO, isLoading, onToggleFollow } = useFollowDAO();
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
            const isFollowing = isFollowingDAO(dao.id);
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
                  <Button
                    variant="outlined"
                    color="secondary"
                    disabled={isLoading(dao.id)}
                    onClick={() => onToggleFollow(dao.id, isFollowing)}
                  >
                    {isFollowing ? t('actions.unfollow') : t('actions.follow')}
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
