import useTranslation from 'next-translate/useTranslation';

import { brandColors, theme } from '@gateway/theme';

import {
  Stack,
  Typography,
  Box,
  alpha,
  Chip,
  useMediaQuery,
} from '@mui/material';

import { MockCredential } from '../credential-view';
import CopyPaste from './copy-paste';

type Props = {
  credential: MockCredential;
};

export default function GeneralInformation({ credential }: Props) {
  const { t } = useTranslation('protocol');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

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
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography
              fontSize={12}
              sx={{ color: alpha(brandColors.white.main, 0.7) }}
            >
              {t('credential.credential-id')}
            </Typography>
            <CopyPaste
              text={credential?.id}
              sucessMessage={t('credential.copy-id')}
            />
          </Stack>
          <Typography variant="h4" fontSize={isMobile ? 20 : 34}>
            {credential?.title}
          </Typography>
        </Stack>
      </Stack>
      {credential?.tags?.length > 0 && (
        <Stack direction="row" gap={1} sx={{ mb: 2 }}>
          {credential.tags.map((tag, index) => (
            <Chip
              label={tag}
              key={index}
              size={isMobile ? 'small' : 'medium'}
            />
          ))}
        </Stack>
      )}
      <Typography sx={{ mb: 3 }}>{credential?.description}</Typography>
    </>
  );
}
