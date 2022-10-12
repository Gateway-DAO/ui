import { useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useWindowVirtualizer } from '@tanstack/react-virtual';

import { TOKENS } from '@gateway/theme';

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { gqlAnonMethods } from '../../../../../services/api';
import { CenteredLoader } from '../../../../atoms/centered-loader';
import { UserCell } from './user-cell';

const offset = 0;

export function PeopleTab() {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      ['people-tab'],
      ({ pageParam = offset }) =>
        gqlAnonMethods.people_tab({ offset: pageParam }),
      {
        getNextPageParam: (lastPage, pages) => {
          if (lastPage.people.length < 15) return undefined;
          return pages.length * 15;
        },
      }
    );

  const people = data?.pages?.flatMap((page) => page.people) ?? [];

  const rowVirtualizer = useWindowVirtualizer({
    count: hasNextPage ? people.length + 1 : people.length,
    estimateSize: () => 77.5,
    overscan: 5,
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
          <TableHead style={{ display: 'table', width: '100%' }}>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
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
