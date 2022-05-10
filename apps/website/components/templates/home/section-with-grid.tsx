import { PropsWithChildren, ReactNode } from 'react';

import { TOKENS } from '@gateway/theme';

import { Box, Stack, Typography } from '@mui/material';

export function SectionWithGrid({
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
      <Box
        sx={{
          display: 'grid',
          px: TOKENS.CONTAINER_PX,
          gap: 2,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2,1fr)',
            lg: 'repeat(3,1fr)',
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
