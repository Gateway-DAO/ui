import useTranslation from 'next-translate/useTranslation';

import { Stack, Typography } from '@mui/material';

import { DashboardTemplate } from '../components/templates/dashboard';

/* TODO: Gap using values */

export default function NewUser() {
  const { t } = useTranslation('dashboard-new-user');
  return (
    <DashboardTemplate>
      <Stack direction="row">
        <Stack direction="column" gap={30}>
          <Typography component="h1" variant="h4">
            {t('title')}
          </Typography>
          <Stack direction="column" gap={16}>
            <Typography component="h2" variant="h5">
              {t('form.title')}
            </Typography>
            <Typography component="p" variant="caption">
              {t('form.caption')}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </DashboardTemplate>
  );
}
