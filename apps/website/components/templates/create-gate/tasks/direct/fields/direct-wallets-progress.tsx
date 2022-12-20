import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';

import { Box, CircularProgress, Stack, Typography } from '@mui/material';

import { VerifyCsvProgressOutput } from '../../../../../../services/hasura/types';
import { useRemainingTime } from '../utils';

type Props = VerifyCsvProgressOutput & {
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
  const verified = valid + invalid;
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
        <Typography variant="body1">
          {t('direct.verifying.progress.title')}
        </Typography>
        {remainingTime > 0 && (
          <Typography variant="body2">{remainingTimeText}</Typography>
        )}
      </Stack>
      <Box>
        <Typography variant="body2" color="text.secondary">
          {t('direct.verifying.progress.description')}
        </Typography>
      </Box>
    </Stack>
  );
}
