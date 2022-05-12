import { PropsWithChildren } from 'react';

import { useBreakpointValue } from '@gateway/ui';

import Typography, { TypographyProps } from '@mui/material/Typography';

export default function Title({ children }: PropsWithChildren<unknown>) {
  /*
  TODO: Fix SSR issue (client className vs server className)
  */
  const variant = useBreakpointValue<TypographyProps['variant']>({
    xs: 'h4',
    sm: 'h3',
    md: 'h1',
  });

  return (
    <Typography
      variant={variant}
      component="h1"
      sx={{
        display: {
          sm: 'none',
          md: 'block',
        },
        textAlign: 'center',
        whiteSpace: 'pre-wrap',
      }}
    >
      {children}
    </Typography>
  );
}
