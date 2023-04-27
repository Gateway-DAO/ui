import { useEffect } from 'react';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { TOKENS } from '@gateway/theme';

import { Box, Stack, Typography } from '@mui/material';

import Loading from '../../../../../components/atoms/loading';
import { query } from '../../../../../constants/queries';
import { gqlAnonMethods } from '../../../../../services/hasura/api';
import { DataModelCard } from '../../../../molecules/data-model-card';

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
              <Typography variant="h6">Issue credentials</Typography>
              <Typography variant="caption">
                Select one of the templates, set up the claims, and you are
                ready to issue a credential for anyone.
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
