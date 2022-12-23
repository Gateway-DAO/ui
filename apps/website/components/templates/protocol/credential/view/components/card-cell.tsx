import { ReactNode } from 'react';

import { brandColors } from '@gateway/theme';

import { Stack, Typography, Box, alpha } from '@mui/material';

type Props = {
  label: string;
  children: ReactNode;
  margin?: boolean;
  alignRight?: boolean;
};

export default function CardCell({
  label,
  children,
  margin = true,
  alignRight = false,
}: Props) {
  return (
    <Stack
      gap={margin ? 1 : 0}
      sx={{
        p: 2,
        width: '100%',
        textAlign: alignRight ? 'right' : 'left',
      }}
    >
      <Typography
        fontSize={12}
        sx={{ color: alpha(brandColors.white.main, 0.7) }}
      >
        {label}
      </Typography>
      <Box fontSize={14}>{children}</Box>
    </Stack>
  );
}
