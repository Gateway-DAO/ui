import useTranslation from 'next-translate/useTranslation';

import { useSnackbar } from 'notistack';
import { useCopyToClipboard } from 'react-use';

import { theme } from '@/theme';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import { ContentCopy } from '@mui/icons-material';
import { Button, Card, CardContent, Stack, Typography } from '@mui/material';

import { useAuth } from '@/providers/auth';

const DeveloperPortalSettings = () => {
  const { t } = useTranslation('settings');
  const { token } = useAuth();

  const [state, copyToClipboard] = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();

  const copy = (value: string) => {
    copyToClipboard(value);
    enqueueSnackbar(`Copied`);
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
              gutterBottom
            >
              {process.env.NEXT_PUBLIC_PLAYGROUND_API_KEY}
            </Typography>
            <Stack direction={'row'} paddingY={1}>
              <WarningAmberIcon color="warning" />
              <Typography
                variant="body1"
                marginLeft={2}
                color={'#FFA726'}
                alignSelf={'center'}
              >
                By sharing your API key, you assume all responsibility for any
                actions performed using your key, whether authorized or
                unauthorized. Learn more.
              </Typography>
            </Stack>
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
              <Typography variant="body1">Authentication Token</Typography>
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
              {`{"Authorization": "Bearer ${token}"}`}
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
};

export default DeveloperPortalSettings;
