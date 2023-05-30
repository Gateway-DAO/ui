import { useEffect } from 'react';

import Loading from '@/components/atoms/loading';
import { LoyaltyProgramCard } from '@/components/molecules/loyalty-program-card/loyalty-program-card';
import { query } from '@/constants/queries';
import { ROUTES } from '@/constants/routes';
import { gqlAnonMethods } from '@/services/hasura/api';
import { TOKENS } from '@/theme';
import { useInfiniteQuery } from '@tanstack/react-query';

import { Box, CircularProgress } from '@mui/material';

export default function PassesTab(): JSX.Element {
  const internalPageSize = 10;

  const {
    data: passes,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [query.passes],
    async ({ pageParam }) => {
      const result = await gqlAnonMethods.loyalty_programs({
        take: internalPageSize,
        skip: pageParam || 0,
      } as any);
      return result.loyalty_program;
    },
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage.length < internalPageSize
          ? undefined
          : pages.length * internalPageSize,
    }
  );

  useEffect(() => {
    let fetching = false;
    const onScroll = async (event) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.05) {
        fetching = true;
        await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <Box sx={{ py: 4 }}>
      {isLoading ? (
        <Box
          key="loading"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: 2,
            px: TOKENS.CONTAINER_PX,
          }}
        >
          {passes &&
            passes.pages.map((page) => (
              <>
                {page.map((pass) => (
                  <LoyaltyProgramCard
                    key={pass.id}
                    {...pass}
                    href={ROUTES.LOYALTY_PROGRAM.replace('[id]', pass.id)}
                  />
                ))}
              </>
            ))}
          {isFetchingNextPage && <Loading />}
        </Box>
      )}
    </Box>
  );
}
