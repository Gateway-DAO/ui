import { useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { TOKENS } from '@gateway/theme';

import { Box } from '@mui/material';

import Loading from '../../../../../components/atoms/loading';
import { query } from '../../../../../constants/queries';
import { gatewayProtocolSDK } from '../../../../../services/gateway-protocol/api';
import { DataModelCard } from '../../../../molecules/data-model-card';

export default function DataModelsTab(): JSX.Element {
  const internalPageSize = 3;
  const {
    data: dataModels,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [query.dataModels],
    async ({ pageParam }) => {
      const result = await gatewayProtocolSDK.dataModels({
        take: internalPageSize,
        skip: pageParam || 0,
      } as any);
      return result.dataModels;
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
        <Loading />
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
          {dataModels &&
            dataModels.pages.map((page) => (
              <>
                {page.map((model) => (
                  <DataModelCard key={1} {...model} />
                ))}
              </>
            ))}
          {isFetchingNextPage && <Loading />}
        </Box>
      )}
    </Box>
  );
}
