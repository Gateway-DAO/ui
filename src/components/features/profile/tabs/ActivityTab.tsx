import { useViewMode, ViewMode } from '@/hooks/use-view-modes';
import { TOKENS } from '@/theme';

import { Box, Typography } from '@mui/material';

export function ActivityTab() {
  const { view, toggleView } = useViewMode();

  return (
    <Box>
      {view === ViewMode.grid && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              md: '1fr',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              borderRight: 1,
              borderColor: 'divider',
            }}
          >
            <Box
              sx={{
                py: '50px',
                px: TOKENS.CONTAINER_PX,
                borderBottom: 1,
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                rowGap: '20px',
              }}
            >
              <Typography
                style={{ color: '#fff', fontSize: '20px' }}
                variant="h2"
              >
                Activity
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
