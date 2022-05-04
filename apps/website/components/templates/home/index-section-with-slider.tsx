import { PropsWithChildren, ReactNode } from 'react';

import { TOKENS } from '@gateway/theme';

import { Box, Stack, Typography } from '@mui/material';

export function IndexSectionWithSlider({
  title,
  caption,
  action,
  children,
}: PropsWithChildren<{ title: string; caption: string; action: ReactNode }>) {
  return (
    <Box component="section">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={TOKENS.CONTAINER_PX}
        mb={4}
      >
        <Box>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="caption">{caption}</Typography>
        </Box>
        {action}
      </Stack>
      <Box sx={{ overflow: 'hidden' }}>
        <Stack
          direction="row"
          gap={2}
          sx={{
            overflowX: 'auto',
            position: 'relative',
            scrollBehavior: 'smooth',
            scrollSnapType: 'x mandatory',
          }}
        >
          {children}
        </Stack>
      </Box>
    </Box>
  );
}
