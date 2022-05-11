import useTranslation from 'next-translate/useTranslation';

import { Box, Stack, Typography } from '@mui/material';

export function NewUserTemplate() {
  const { t } = useTranslation('dashboard-new-user');
  return (
    <Stack direction="row">
      <Stack direction="column" gap={7.5}>
        <Typography component="h1" variant="h4">
          {t('title')}
        </Typography>
        <Stack direction="column" gap={1}>
          <Box>
            <Typography component="h2" variant="h5">
              {t('form.title')}
            </Typography>
            <Typography component="p" variant="caption">
              {t('form.caption')}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}
