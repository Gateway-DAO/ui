import useTranslation from 'next-translate/useTranslation';

import { brandColors, theme } from '@/theme';

import { Divider, Link, Stack, Typography } from '@mui/material';
import { CredentialIdentityCard } from './components/credential-identity-card';

import Email from './components/email';
import { EditId } from './components/sections/edit-id';
import { LoadingButton } from '../../../atoms/loading-button';

import { ConnectionHandlerGithub } from '@/services/social-connectors/github-connection';
import { OtherAccount } from './components/sections/other-accounts';

const AccountManagementSettings = () => {
  const { t } = useTranslation('settings');

  return (
    <Stack width={'100%'} marginBottom={4}>
      <Typography variant="h6" sx={{ mb: 7 }}>
        {t('nav.account-management-title')}
      </Typography>
      <Stack gap={5}>
        <div>
          <Typography variant="subtitle1" color={'white'} gutterBottom>
            {t('nav.account-credential-title')}
          </Typography>
          <Typography variant="caption" gutterBottom>
            {t('nav.account-credential-caption')}
          </Typography>
        </div>
        <CredentialIdentityCard />
        <Divider variant="fullWidth" style={{ margin: ' 0 -3.7rem' }} />
        <EditId />
        <Divider variant="fullWidth" style={{ margin: ' 0 -3.7rem' }} />
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <span>
            <Typography variant="subtitle1" color={'white'} gutterBottom>
              {t('account-management.wallet-section-title')}
            </Typography>
            <Typography variant="caption" gutterBottom>
              {t('account-management.wallet-section-desc')}
            </Typography>
          </span>
          <LoadingButton variant="text">
            {' '}
            {t('account-management.wallet-section-btn')}
          </LoadingButton>
        </Stack>
        <Divider variant="fullWidth" style={{ margin: ' 0 -3.7rem' }} />
        <OtherAccount />
        <Divider variant="fullWidth" style={{ margin: ' 0 -3.7rem' }} />
        <Stack height={'100%'} gap={4}>
          <div>
            <Typography variant="subtitle1" color={'white'} gutterBottom>
              {t('account-management.delete-section.title')}
            </Typography>
            <Typography variant="caption" gutterBottom>
              {t('account-management.delete-section.desc')}
            </Typography>
          </div>
          <span>
            <LoadingButton variant="contained" color="error" size="large">
              {t('account-management.delete-section.btn')}
            </LoadingButton>
          </span>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AccountManagementSettings;
