import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';

import {
  VerifyCsvProgressOutput,
  VerifySingleOutput,
} from '@/services/hasura/types';

import { Box, CircularProgress, Stack, Typography } from '@mui/material';

import { useRemainingTime } from '../utils';

type Props = (VerifyCsvProgressOutput | VerifySingleOutput) & {
  isLoading?: boolean;
};

export function DirectWalletsProgress({
  isLoading,
  total,
  valid,
  invalid,
  uploadedTime,
}: Props) {
  const { t } = useTranslation('gate-new');
  const verified = !isNaN(valid) && !isNaN(invalid) ? valid + invalid : 0;
  const percent = verified / total;
  const progress = Math.floor(percent * 100);

  const remainingTime = useRemainingTime(!isLoading, uploadedTime, percent);

  const remainingTimeText = useMemo(() => {
    if (!remainingTime) return;

    // Get remaining time in seconds and convert to minutes
    const minutes = Math.floor(remainingTime / 60);
    if (minutes > 0) {
      return t('direct.verifying.progress.remaining.minutes', {
        total: minutes,
      });
    }
    return t('direct.verifying.progress.remaining.seconds', {
      total: remainingTime,
    });
  }, [remainingTime]);

  return (
    <Stack
      gap={2}
      alignItems="center"
      sx={{
        background: '#261738',
        borderRadius: 1,
        border: 1,
        borderStyle: 'solid',
        borderColor: 'primary.main',
        p: 3.75,
      }}
    >
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" value={progress} size={56} />
        <Box
          sx={{
            position: 'absolute',
            inset: 3,
            background: '#453854',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '100%',
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`${progress}%`}</Typography>
        </Box>
      </Box>
      <Stack gap={0.5} alignItems="center">
        <Typography variant="body1">Verifying recipients</Typography>
        {remainingTime > 0 && (
          <Typography variant="body2">{remainingTimeText}</Typography>
        )}
      </Stack>
      <Box>
        <Typography variant="body2" color="text.secondary">
          You don't need to wait, you can save as draft and come back later
        </Typography>
      </Box>
    </Stack>
  );
}
