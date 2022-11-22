import useTranslation from 'next-translate/useTranslation';

import { Box, Stack, Typography } from '@mui/material';

type Props = {
  totalWallets?: number;
};

export function DirectWalletsEmptyHeader() {
  const { t } = useTranslation('gate-new');

  return (
    <Stack direction="column" gap={2}>
      <Stack
        direction={{
          xs: 'column',
          lg: 'row',
        }}
        alignItems={{
          xs: 'flex-start',
          lg: 'center',
        }}
        justifyContent="space-between"
        gap={2}
      >
        <Box>
          <Typography variant="h6">{t('direct.title')}</Typography>
          <Typography variant="body1" color="text.secondary">
            {t('direct.description')}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
}

export function DirectWalletsHeader({ totalWallets = 0 }: Props) {
  const { t } = useTranslation('gate-new');

  return (
    <Stack direction="column" gap={2}>
      <Stack
        direction={{
          xs: 'column',
          lg: 'row',
        }}
        alignItems={{
          xs: 'flex-start',
          lg: 'center',
        }}
        justifyContent="space-between"
        gap={2}
      >
        <Box>
          <Typography variant="h6">
            {t('direct.title-filled', { count: totalWallets })}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
}
