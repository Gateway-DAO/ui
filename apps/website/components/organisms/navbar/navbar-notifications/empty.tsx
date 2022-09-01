import useTranslation from 'next-translate/useTranslation';

import { Box, Typography } from '@mui/material';

export function EmptyNotifications() {
  const { t } = useTranslation('notifications');
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="body2" color="text.secondary">
        {t('empty')}
      </Typography>
    </Box>
  );
}
