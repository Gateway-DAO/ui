import useTranslation from 'next-translate/useTranslation';

import { useAuth } from '@/providers/auth';

import { Stack, Typography } from '@mui/material';

import { CardCopy } from './components/card-copy';
import { UsageLimit } from './components/usage-limit';

const DeveloperPortalSettings = () => {
  const { t } = useTranslation('settings');
  const { token } = useAuth();

  return (
    <Stack>
      <Stack mb={4}>
        <Typography variant="h6">{t('nav.developer-portal-title')}</Typography>
        <Typography variant="caption">
          {t('nav.developer-portal-description')}
        </Typography>
      </Stack>
      <CardCopy
        title={t('developer-portal.api-key-title')}
        content={process.env.NEXT_PUBLIC_PLAYGROUND_API_KEY}
        valueToCopy={process.env.NEXT_PUBLIC_PLAYGROUND_API_KEY}
        warningText={t('developer-portal.api-key-warning')}
      />
      <CardCopy
        title={t('developer-portal.authentication-token-title')}
        content={`{"Authorization": "Bearer ${token}"}`}
        valueToCopy={`Bearer ${token}`}
      />
      <UsageLimit />
    </Stack>
  );
};

export default DeveloperPortalSettings;
