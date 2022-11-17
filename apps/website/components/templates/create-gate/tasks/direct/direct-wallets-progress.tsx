import useTranslation from 'next-translate/useTranslation';

import {
  Box,
  CircularProgress,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';

import { ProgressVerifyCSV } from './types';

export function DirectWalletsProgress({
  total,
  isDone,
  valid,
  invalid,
}: ProgressVerifyCSV) {
  const { t } = useTranslation('gate-new');
  const verified = valid + invalid;
  const progress = verified / total;

  return (
    <Stack gap={3}>
      <Box>
        <Stack direction="row" gap={2} alignItems="center">
          <Typography variant="body1">{t('direct.progress.title')}</Typography>
          {!isDone && <CircularProgress size="1rem" />}
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {t('direct.progress.description')}
        </Typography>
      </Box>
      <Stack gap={1}>
        <Stack justifyContent="space-between" direction="row">
          <Typography>{t('direct.progress.verified')}</Typography>
          <Typography>{t('direct.progress.total')}</Typography>
        </Stack>
        <LinearProgress variant="determinate" value={progress * 100} />
        <Stack justifyContent="space-between" direction="row">
          <Typography>{verified}</Typography>
          <Typography textAlign="center">
            {(progress * 100).toFixed(2)}%
          </Typography>
          <Typography>{total}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
