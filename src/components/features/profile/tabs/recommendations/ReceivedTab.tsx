import { TOKENS } from '@/theme';

import { Box, Typography } from '@mui/material';

export function ReceivedTab() {
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
