import { PropsWithChildren } from 'react';

import Typography from '@mui/material/Typography';

export default function Title({ children }: PropsWithChildren<unknown>) {
  return (
    <Typography
      variant="h1"
      component="h1"
      sx={(theme) => ({
        whiteSpace: 'pre-wrap',
        fontSize: '4.875rem',
        maxWidth: '760px',
        [theme.breakpoints.down('md')]: {
          ...theme.typography.h3,
        },
        [theme.breakpoints.down('sm')]: {
          ...theme.typography.h4,
        },
      })}
    >
      {children}
    </Typography>
  );
}
