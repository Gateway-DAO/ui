import useTranslation from 'next-translate/useTranslation';

import { theme } from '@gateway/theme';

import { Card, CardContent, Stack, Typography } from '@mui/material';

import { useAuth } from '../../../../providers/auth';

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
      <Stack mb={2}>
        <Card>
          <CardContent>
            <Stack>
              <Typography variant="body1" mb={1}>
                API Key
              </Typography>
            </Stack>
            <Typography
              variant="body1"
              color={theme.palette.secondary.dark}
              fontFamily="Fira Code"
            >
              {process.env.NEXT_PUBLIC_PROTOCOL_API_KEY}
            </Typography>
          </CardContent>
        </Card>
      </Stack>
      <Stack>
        <Card>
          <CardContent>
            <Stack>
              <Typography variant="body1" mb={1}>
                Bearer
              </Typography>
            </Stack>
            <Typography
              variant="body1"
              color={theme.palette.secondary.dark}
              fontFamily="Fira Code"
              sx={{
                wordBreak: 'break-word',
              }}
            >
              {`Bearer ${token}`}
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
};

export default DeveloperPortalSettings;
