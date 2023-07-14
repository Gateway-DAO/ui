import useTranslation from 'next-translate/useTranslation';

import { theme } from '@/theme';
import { useSnackbar } from 'notistack';
import { useCopyToClipboard } from 'react-use';

import { ContentCopy } from '@mui/icons-material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Button, Card, CardContent, Stack, Typography } from '@mui/material';

type Props = {
  title: string;
  content: string;
  valueToCopy: string;
  warningText?: string;
};

export function CardCopy({ title, content, valueToCopy, warningText }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('settings');
  const [_state, copyToClipboard] = useCopyToClipboard();

  const copy = (value: string) => {
    copyToClipboard(value);
    enqueueSnackbar(t('developer-portal.copied'));
  };

  return (
    <Stack mb={3}>
      <Card sx={{ pt: 1 }}>
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography variant="body1">{title}</Typography>
            <Button
              variant="outlined"
              startIcon={<ContentCopy />}
              size="small"
              onClick={() => copy(valueToCopy)}
            >
              {t('developer-portal.copy')}
            </Button>
          </Stack>

          <Typography
            variant="body1"
            color={theme.palette.secondary.dark}
            fontFamily="Fira Code"
            gutterBottom
            sx={{ wordBreak: 'break-all' }}
          >
            {content}
          </Typography>
          {warningText && (
            <Stack direction={'row'} paddingY={1}>
              <WarningAmberIcon color="warning" />
              <Typography
                variant="body1"
                marginLeft={2}
                color={'#FFA726'}
                alignSelf={'center'}
              >
                {warningText}
              </Typography>
            </Stack>
          )}
        </CardContent>
      </Card>
    </Stack>
  );
}
