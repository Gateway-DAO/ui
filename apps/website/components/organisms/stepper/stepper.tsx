import { brandColors } from '@gateway/theme';

import { Check } from '@mui/icons-material';
import { Avatar, Divider, Stack, Typography, alpha } from '@mui/material';

export default function Stepper() {
  return (
    <Stack direction="column">
      <Stack direction="row" alignItems="center" gap={2}>
        <Avatar
          sx={{
            backgroundColor: brandColors.purple.main,
            width: '24px',
            height: '24px',
          }}
        >
          <Check fontSize="small" />
        </Avatar>
        <Typography variant="body1" color={alpha(brandColors.white.main, 0.5)}>
          Application
        </Typography>
      </Stack>
      <Divider
        sx={{ height: '30px', width: '2px', ml: 1.5 }}
        orientation="vertical"
        color={brandColors.purple.main}
        flexItem
      />
      <Stack direction="row" alignItems="center" gap={2}>
        <Avatar
          sx={{
            backgroundColor: brandColors.purple.main,
            width: '24px',
            height: '24px',
            fontSize: '14px',
            fontWeight: 700,
          }}
        >
          2
        </Avatar>
        <Typography variant="body1">Review</Typography>
      </Stack>
      <Divider
        sx={{ height: '30px', width: '2px', ml: 1.5 }}
        orientation="vertical"
        color={alpha(brandColors.white.main, 0.15)}
        flexItem
      />
      <Stack direction="row" alignItems="center" gap={2}>
        <Avatar
          sx={{
            backgroundColor: alpha(brandColors.white.main, 0.15),
            width: '24px',
            height: '24px',
            fontSize: '14px',
            fontWeight: 700,
          }}
        >
          3
        </Avatar>
        <Typography variant="body1" color={alpha(brandColors.white.main, 0.5)}>
          Feedback
        </Typography>
      </Stack>
    </Stack>
  );
}
