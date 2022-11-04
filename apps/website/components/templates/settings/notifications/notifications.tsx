import useTranslation from 'next-translate/useTranslation';

import { Stack, Typography } from '@mui/material';

const NotificationsSettings = () => {
  const { t } = useTranslation('settings');

  return (
    <Stack>
      <Stack sx={{ width: '100%', mb: 5 }}>
        <Typography variant="h6" sx={{ mb: '4px' }}>
          {t('nav.notifications-title')}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default NotificationsSettings;
