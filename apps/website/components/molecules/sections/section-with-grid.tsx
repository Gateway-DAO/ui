import { PropsWithChildren, ReactNode } from 'react';

import { TOKENS } from '@gateway/theme';

import { Box, Stack, Typography } from '@mui/material';

export type SectionWithGridProp = {
  title: string;
  caption: string;
  action: ReactNode;
  gridSize?: {
    xs?: number;
    md?: number;
    lg?: number;
  };
};

export function SectionWithGrid({
  title,
  caption,
  action,
  gridSize: propGridSize,
  children,
}: PropsWithChildren<SectionWithGridProp>) {
  const gridSize = {
    xs: 1,
    md: 2,
    lg: 3,
    ...propGridSize,
  };

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
        <Box
          sx={{
            display: {
              xs: 'none',
              md: 'block',
            },
          }}
        >
          {action}
        </Box>
      </Stack>
      <Box
        sx={{
          display: 'grid',
          px: TOKENS.CONTAINER_PX,
          gap: 2,
          gridTemplateColumns: {
            xs: `repeat(${gridSize.xs}, 1fr)`,
            md: `repeat(${gridSize.md},1fr)`,
            lg: `repeat(${gridSize.lg},1fr)`,
          },
        }}
      >
        {children}
      </Box>
      <Box
        sx={{
          display: {
            xs: 'block',
            md: 'none',
          },
          px: TOKENS.CONTAINER_PX,
          mt: 2,
        }}
      >
        {action}
      </Box>
    </Box>
  );
}
