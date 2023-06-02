import { Box, Divider } from '@mui/material';

import DataModels from './data-models';
import DataModelsP2P from './data-models-p2p';

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
