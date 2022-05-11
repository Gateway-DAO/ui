import { PropsWithChildren } from 'react';

import { useBreakpointValue } from '@gateway/ui';

import Typography, { TypographyProps } from '@mui/material/Typography';

export function Title({ children }: PropsWithChildren<unknown>) {
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
        textAlign: 'center',
        whiteSpace: 'pre-wrap',
      }}
    >
      {children}
    </Typography>
  );
}
