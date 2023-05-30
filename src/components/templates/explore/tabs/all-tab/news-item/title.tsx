import { PropsWithChildren } from 'react';

import { Box, BoxProps, Button, Stack, Typography } from '@mui/material';

import { NewsProp } from './type';

export function NewsTitle({ isBig, children }: PropsWithChildren<NewsProp>) {
  return (
    <Typography
      whiteSpace="pre-wrap"
      sx={(theme) => ({
        ...theme.typography.h5,
        [theme.breakpoints.up('md')]: {
          ...(isBig ? theme.typography.h4 : theme.typography.h6),
        },
      })}
    >
      {children}
    </Typography>
  );
}
