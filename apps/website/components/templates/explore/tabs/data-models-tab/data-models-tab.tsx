import { Box, Stack, Typography } from '@mui/material';

import DataModelsP2P from './data-models-p2p';
import DataModels from './data-models';

export default function DataModelsTab(): JSX.Element {
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
        <DataModels />
      </>
    </Box>
  );
}
