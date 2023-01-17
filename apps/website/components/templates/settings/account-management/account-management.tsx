import useTranslation from 'next-translate/useTranslation';

import { brandColors } from '@gateway/theme';

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
        <Typography fontSize="16px" sx={{ fontWeight: 600 }}>
          {t('account-management.registered-email-title')}
        </Typography>
        <Typography variant="body2" fontSize="12px">
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
