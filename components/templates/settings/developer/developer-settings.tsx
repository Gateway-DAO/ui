import useTranslation from 'next-translate/useTranslation';

import { theme } from 'apps/website/theme';
import { useSnackbar } from 'notistack';
import { useCopyToClipboard } from 'react-use';

import { ContentCopy } from '@mui/icons-material';
import { Button, Card, CardContent, Stack, Typography } from '@mui/material';

import { useAuth } from '../../../../providers/auth';

const DeveloperPortalSettings = () => {
  const { t } = useTranslation('settings');
  const { token } = useAuth();

  const [state, copyToClipboard] = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();

  const copy = (value: string) => {
    copyToClipboard(value);
    enqueueSnackbar(`Copied!`);
  };

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
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography variant="body1">API Key</Typography>
              <Button
                variant="outlined"
                startIcon={<ContentCopy />}
                size="small"
                onClick={() => copy(process.env.NEXT_PUBLIC_PLAYGROUND_API_KEY)}
              >
                Copy
              </Button>
            </Stack>
            <Typography
              variant="body1"
              color={theme.palette.secondary.dark}
              fontFamily="Fira Code"
            >
              {process.env.NEXT_PUBLIC_PLAYGROUND_API_KEY}
            </Typography>
          </CardContent>
        </Card>
      </Stack>
      <Stack>
        <Card>
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography variant="body1">Bearer</Typography>
              <Button
                variant="outlined"
                startIcon={<ContentCopy />}
                size="small"
                onClick={() => copy(`Bearer ${token}`)}
              >
                Copy
              </Button>
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
