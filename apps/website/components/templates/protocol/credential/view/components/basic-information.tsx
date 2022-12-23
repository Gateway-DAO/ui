import { limitChars } from '@gateway/helpers';
import { brandColors } from '@gateway/theme';

import { Stack, Typography, Box, alpha, Chip } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { MockCredential } from '../credential-view';

type Props = {
  credential: MockCredential;
}

export default function BasicInformation({ credential }: Props) {
  const { t } = useTranslation('protocol');

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
              {t('credential.credential-id')}
            </Typography>
            <Typography
              fontSize={12}
              sx={{ color: alpha(brandColors.white.main, 0.7) }}
            >
              {limitChars(credential?.id, 20)}
            </Typography>
          </Stack>
          <Typography variant="h4">{credential?.title}</Typography>
        </Stack>
      </Stack>
      {credential?.tags?.length && (
        <Stack direction="row" gap={1} sx={{ mb: 2 }}>
          {credential.tags.map((tag, index) => (
            <Chip label={tag} key={index} />
          ))}
        </Stack>
      )}
      <Typography sx={{ mb: 3 }}>{credential?.description}</Typography>
    </>
  );
}
