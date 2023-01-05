import { ReactNode } from 'react';

import { brandColors } from '@gateway/theme';

import { Stack, Typography, Box, alpha } from '@mui/material';

type Props = {
  label: string;
  children: ReactNode;
  margin?: boolean;
  px?: number;
  py?: number;
  alignRight?: boolean;
};

export default function CardCell({
  label,
  children,
  margin = true,
  py = 2,
  px = 2,
  alignRight = false,
}: Props) {
  return (
    <Stack
      gap={margin ? 1 : 0}
      sx={{
        px,
        py,
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
      <Box
        fontSize={14}
        sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
      >
        {children}
      </Box>
    </Stack>
  );
}
