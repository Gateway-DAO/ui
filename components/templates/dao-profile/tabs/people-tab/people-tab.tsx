import { useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useWindowVirtualizer } from '@tanstack/react-virtual';

import { TOKENS } from '@/theme';

import { Box, Table, TableBody, TableContainer } from '@mui/material';

import { CenteredLoader } from '../../../../../components/atoms/centered-loader';
import { gqlAnonMethods } from '@/services/hasura/api';
import { useDaoProfile } from '../../context';
import { UserCell } from './user-cell';

const offset = 0;

export function PeopleTab() {
  const { isAdmin, dao } = useDaoProfile();

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      ['dao', dao.id, 'people'],
      ({ pageParam = offset }) =>
        gqlAnonMethods.dao_profile_people({ id: dao.id, offset: pageParam }),
      {
        getNextPageParam: (lastPage, pages) => {
          if (lastPage.daos_by_pk.followers.length < 15) return undefined;
          return pages.length * 15;
        },
      }
    );

  const people =
    data?.pages?.flatMap((page) =>
      page.daos_by_pk.followers.flatMap((follower) => follower.user)
    ) ?? [];

  const rowVirtualizer = useWindowVirtualizer({
    count: hasNextPage ? people.length + 1 : people.length,
    estimateSize: () => 78.9,
    overscan: 8,
  });

  const items = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    if (
      items.length &&
      items[items.length - 1].index > people.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, items, people.length]);

  if (isLoading)
    return (
      <Box sx={{ py: 4 }}>
        <CenteredLoader />
      </Box>
    );

  return (
    <Box sx={{ py: 4 }}>
      <TableContainer
        sx={{
          '& .MuiTableCell-root:first-of-type': {
            pl: TOKENS.CONTAINER_PX,
          },
          '& .MuiTableCell-root:last-of-type': {
            pr: TOKENS.CONTAINER_PX,
          },
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Table
          style={{ display: 'block' }}
          stickyHeader
          aria-label="sticky table"
        >
          <TableBody
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
              display: 'table',
            }}
          >
            {items.map((row) => {
              const { size, start, index } = row;
              const isLoaderRow = index > people.length - 1;
              const user = people[index];
              if (!hasNextPage && isLoaderRow) return null;
              if (isLoaderRow) {
                return (
                  <CenteredLoader
                    key={row.index}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${size}px`,
                      transform: `translateY(${start}px)`,
                    }}
                  />
                );
              }
              return (
                <UserCell key={user.id} user={user} size={size} start={start} />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
