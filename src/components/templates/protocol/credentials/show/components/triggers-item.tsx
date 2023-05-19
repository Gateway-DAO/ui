import { ReactNode } from 'react';

import { brandColors } from '@/theme';

import { alpha, Stack, Typography } from '@mui/material';

import { SeeMore } from '@/components/molecules/see-more';

export default function TriggersItem({
  name,
  value,
  icon,
}: {
  name: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      gap={1}
      sx={{ p: { xs: 3, md: 2 }, flexDirection: { md: 'row', xs: 'column' } }}
    >
      <Stack flexGrow={1} flexDirection="row" gap={1}>
        {icon}
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: 14,
            color: alpha(brandColors.white.main, 0.7),
            flexGrow: 1,
          }}
        >
          {name}
        </Typography>
      </Stack>
      <SeeMore text={value} length={45} />
    </Stack>
  );
}
