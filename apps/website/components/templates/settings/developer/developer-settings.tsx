import useTranslation from 'next-translate/useTranslation';

import { brandColors, theme } from '@gateway/theme';

import {
  Card,
  CardContent,
  CardHeader,
  Link,
  Stack,
  Typography,
} from '@mui/material';

const DeveloperPortalSettings = () => {
  const { t } = useTranslation('settings');

  return (
    <Stack width="100%">
      <Stack sx={{ width: '100%', mb: 4 }}>
        <Typography variant="h6">{t('nav.developer-portal-title')}</Typography>
        <Typography variant="caption">
          {t('nav.developer-portal-description')}
        </Typography>
      </Stack>
      <Stack width="100%">
        <Card>
          <CardContent>
            <Stack>
              <Typography variant="body1">API Key</Typography>
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
      <Stack width="100%">
        <Card>
          <CardContent>
            <Stack>
              <Typography variant="body1">Bearer</Typography>
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
    </Stack>
  );
};

export default DeveloperPortalSettings;
