import { useInfiniteQuery } from 'react-query';

import { Box, Button, CircularProgress } from '@mui/material';

import { gqlAnonMethods } from '../../../../../services/api';
import { TableView } from './table-view';

const offset = 0;

export function PeopleTab() {
  const {
    data,
    isLoading,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ['people-tab'],
    ({ pageParam = offset }) =>
      gqlAnonMethods.people_tab({ offset: pageParam }),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.people.length < 15) return undefined;
        console.log(pages.length * 15);
        return pages.length * 15;
      },
    }
  );

  const people = data?.pages?.flatMap((page) => page.people) ?? [];
  return (
    <Box sx={{ py: 4 }}>
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableView people={people ?? []} />
          {isFetchingNextPage && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 5,
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {hasNextPage && (
            <Button
              type="button"
              disabled={isFetchingNextPage}
              onClick={() => fetchNextPage()}
              fullWidth
              sx={{ my: 4 }}
            >
              Load More
            </Button>
          )}
        </>
      )}
    </Box>
  );
}
