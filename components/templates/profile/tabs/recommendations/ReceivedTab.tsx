import { PartialDeep } from 'type-fest';

import { TOKENS } from '@/theme';

import { AutoAwesomeMosaic, ViewList } from '@mui/icons-material';
import { Box, Typography, Stack } from '@mui/material';
import Chip from '@mui/material/Chip';

import { useViewMode, ViewMode } from '../../../../../hooks/use-view-modes';

export function ReceivedTab() {
  const { view, toggleView } = useViewMode();

  return (
    <Box
      sx={{
        py: '50px',
        px: TOKENS.CONTAINER_PX,
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px',
      }}
    >
      <Typography
        style={{
          fontSize: '16px',
          fontWeight: '400',
          color: 'rgba(255, 255, 255, 0.7)',
        }}
        variant="h6"
      >
        No recommendations yet
      </Typography>
    </Box>
  );
}
