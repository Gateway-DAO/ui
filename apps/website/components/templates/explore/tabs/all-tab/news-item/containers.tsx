import { PropsWithChildren } from 'react';

import { Box, BoxProps } from '@mui/material';

import { NewsProp } from './type';

export function NewsContainer({
  children,
  isBig,
  sx,
  ...props
}: PropsWithChildren<NewsProp & Partial<BoxProps>>) {
  return (
    <Box
      {...props}
      sx={{
        background: 'black',
        p: {
          xs: 1,
          md: isBig ? 2.25 : 1,
        },
        borderRadius: 2,
        position: 'relative',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
