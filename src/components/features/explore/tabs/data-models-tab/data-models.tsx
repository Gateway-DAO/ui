import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';

import Loading from '@/components/atoms/loadings/loading';
import { DataModelCard } from '@/components/molecules/cards/data-model-card';
import { query } from '@/constants/queries';
import { gqlAnonMethods } from '@/services/hasura/api';
import { TOKENS } from '@/theme';
import { useInfiniteQuery } from '@tanstack/react-query';

import { Box, Stack, Typography } from '@mui/material';

export default function DataModels(): JSX.Element {
  const internalPageSize = 16;
  const {
    data: dataModels,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [query.dataModels],
    async ({ pageParam }) => {
      const result = await gqlAnonMethods.protocol_data_models({
        take: internalPageSize,
        skip: pageParam || 0,
      } as any);

      return result.protocol_data_model;
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
  const { t } = useTranslation();
  return (
    <Box sx={{ py: 4 }}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            px={TOKENS.CONTAINER_PX}
            mb={4}
          >
            <Box>
              <Typography variant="h6">
                {' '}
                {t('explore:data-models.title')}
              </Typography>
              <Typography variant="caption">
                {t('explore:data-models.description')}
              </Typography>
            </Box>
          </Stack>
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
        </>
      )}
    </Box>
  );
}
