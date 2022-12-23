import { limitChars } from '@gateway/helpers';
import { brandColors } from '@gateway/theme';

import { Stack, Typography, Box, alpha, Chip } from '@mui/material';

export default function BasicInformation() {
  return (
    <>
      <Stack direction="row" gap={3} sx={{ mb: 3 }}>
        <Box
          sx={{
            width: 80,
            height: 80,
            background: brandColors.background.elevated,
            textAlign: 'center',
            verticalAlign: 'center',
          }}
        >
          QR
        </Box>
        <Stack sx={{ verticalAlign: 'center', justifyContent: 'center' }}>
          <Stack direction="row" gap={1}>
            <Typography
              fontSize={12}
              sx={{ color: alpha(brandColors.white.main, 0.7) }}
            >
              Credential ID
            </Typography>
            <Typography
              fontSize={12}
              sx={{ color: alpha(brandColors.white.main, 0.7) }}
            >
              {limitChars('fbabef4b-809f-4a55-af71-32e00b6e6828', 20)}
            </Typography>
          </Stack>
          <Typography variant="h4">Certification of Degree</Typography>
        </Stack>
      </Stack>
      <Stack direction="row" gap={1} sx={{ mb: 2 }}>
        <Chip label="Education" />
        <Chip label="Undergraduate" />
        <Chip label="Development" />
      </Stack>
      <Typography sx={{ mb: 3 }}>
        This credential certifies that the student has completed the
        undergraduate degree program at Harvard University.
      </Typography>
    </>
  );
}
