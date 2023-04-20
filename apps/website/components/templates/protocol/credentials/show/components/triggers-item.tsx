import { ReactNode } from 'react';

import { brandColors } from '@gateway/theme';

import { alpha, Stack, Typography } from '@mui/material';

import { SeeMore } from '../../../../../../components/molecules/see-more';

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
      sx={{ p: { xs: 3, md: 2 } }}
    >
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
      <SeeMore text={value} length={45} />
    </Stack>
  );
}
