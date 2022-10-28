import useTranslation from 'next-translate/useTranslation';

import { Box, Button, Stack, Typography } from '@mui/material';
import { connectionHandlerTwitter } from '../../templates/settings/connected-accounts/connectors/twitter-connection';

type TwitterCardConnectionProps = {
  width?: string;
  maxWidth?: string;
}

export default function TwitterConnectionCard({ width = 'auto', maxWidth = '100%' }: TwitterCardConnectionProps) {
  const { t } = useTranslation('gate-profile');
  const { connect } = connectionHandlerTwitter();

  return (
    <Stack
      sx={{
        position: 'relative',
        background: '#1B97F0',
        p: 2,
        borderRadius: '0 0 8px 8px',
        width,
        maxWidth,
      }}
    >
      <Stack
        direction={'row'}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          verticalAlign: 'middle',
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: '600', mb: 1 }}>
            {t('twitter.connect')}
          </Typography>
          <Typography sx={{ flexGrow: 1, opacity: 0.7 }}>
            {t('twitter.description')}
          </Typography>
        </Box>
        <Button
          onClick={() => connect()}
          sx={{
            background: (theme) => theme.palette.grey[300],
            color: 'black',
            fontSize: '0.75rem',
            padding: '6px 16px',
            whiteSpace: 'nowrap',
            lineHeight: '24px',
            minWidth: '145px',
            marginLeft: '15px',
            boxShadow: '#444 1px 1px 2px',
            flexGrow: 0,
            '&:hover': {
              background: (theme) => theme.palette.grey[400],
            },
          }}
        >
          {t('twitter.action')}
        </Button>
      </Stack>
    </Stack>
  );
}
