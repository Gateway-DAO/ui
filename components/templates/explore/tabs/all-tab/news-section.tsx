import { PropsWithChildren } from 'react';

import { TOKENS } from '@/theme';

import { Box } from '@mui/material';

export function NewsSection({ children }: PropsWithChildren<unknown>) {
  return (
    <Box
      component="section"
      display="grid"
      sx={{
        gridTemplateColumns: { md: '1.5fr 1fr' },
        gridTemplateRows: { md: '1fr 1fr' },
        gap: 2,
        px: TOKENS.CONTAINER_PX,
        '> :first-of-type': {
          gridRow: {
            xs: 1,
            md: '1/3',
          },
        },
      }}
    >
      {children}
    </Box>
  );
}
