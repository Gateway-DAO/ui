import useTranslation from 'next-translate/useTranslation';

import { Box, CircularProgress, Stack, Typography } from '@mui/material';

import { ProgressVerifyCSV } from '../types';

export function DirectWalletsProgress({
  total,
  valid,
  invalid,
}: ProgressVerifyCSV) {
  const { t } = useTranslation('gate-new');
  const verified = valid + invalid;
  const progress = Math.floor((verified / total) * 100);

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
        <Typography variant="body1">{t('direct.progress.title')}</Typography>
        {/* <Typography variant="body2">15 sec remaining</Typography> */}
      </Stack>
      <Box>
        <Typography variant="body2" color="text.secondary">
          {t('direct.progress.description')}
        </Typography>
      </Box>
    </Stack>
  );
}
