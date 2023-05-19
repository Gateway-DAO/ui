import { Box, Divider, Stack, Typography } from '@mui/material';

import DataModelsP2P from './data-models-p2p';
import DataModels from './data-models';
import { useInfiniteQuery } from '@tanstack/react-query';

export function DataModelsTab(): JSX.Element {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
      }}
    >
      <>
        <DataModelsP2P />
        <Divider />
        <DataModels />
      </>
    </Box>
  );
}
