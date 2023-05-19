import useTranslation from 'next-translate/useTranslation';

import { brandColors } from 'apps/website/theme';

import { Link, Stack, Typography } from '@mui/material';

import Email from './components/email';

const AccountManagementSettings = () => {
  const { t } = useTranslation('settings');

  return (
    <Stack>
      <Stack sx={{ width: '100%', mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 7 }}>
          {t('nav.account-management-title')}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'white' }}>
          {t('account-management.registered-email-title')}
        </Typography>
        <Typography variant="caption">
          {t('account-management.registered-email-description')}
          <Link
            sx={{
              color: brandColors.purple.main,
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            {' '}
            {t('account-management.here')}
          </Link>
          .
        </Typography>
      </Stack>

      <Email />
    </Stack>
  );
};

export default AccountManagementSettings;
