import { PartialDeep } from 'type-fest';

import { TOKENS } from '@gateway/theme';

import { AutoAwesomeMosaic, ViewList } from '@mui/icons-material';
import { Box, Typography, Stack } from '@mui/material';
import Chip from '@mui/material/Chip';

import { useViewMode, ViewMode } from '../../../../hooks/use-view-modes';
import { Gates } from '../../../../services/graphql/types.generated';

type Props = {
  gates: PartialDeep<Gates>[];
};

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
