import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';

import Loading from '@/components/atoms/loading';
import { DataModelCard } from '@/components/molecules/data-model-card';
import { query } from '@/constants/queries';
import { gqlAnonMethods } from '@/services/hasura/api';
import { TOKENS } from '@/theme';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { Box, Stack, Typography } from '@mui/material';

export default function DataModelsP2P(): JSX.Element {
  const { data: dataModels, isLoading } = useQuery(
    ['data-models-p2p'],
    async () => {
      const result = await gqlAnonMethods.dataModelsP2P({
        take: 4,
        skip: 0,
      } as any);
      return result.protocol_data_model;
    }
  );
  const { t } = useTranslation('explore');
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
                {t('explore:data-models-p2p.title')}
              </Typography>
              <Typography variant="caption">
                {t('explore:data-models-p2p.description')}
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
              dataModels.map((model, index) => (
                <DataModelCard key={index} {...model} />
              ))}
          </Box>
        </>
      )}
    </Box>
  );
}
