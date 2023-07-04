import useTranslation from 'next-translate/useTranslation';

import { Divider, Stack, Typography } from '@mui/material';

import { DeleteId } from './delete-id/delete-id';
import { EditId } from './edit-id/edit-id';
import { EmailAlias } from './email/email-alias';
import { OtherAccount } from './others-accounts/other-accounts';
import { YourAccountCredential } from './your-account/your-account-credential';

const AccountManagementSettings = () => {
  const { t } = useTranslation('settings');

  return (
    <Stack width={'100%'} marginBottom={4}>
      <Typography variant="h6" sx={{ mb: 7 }}>
        {t('nav.account-management-title')}
      </Typography>
      <Stack
        gap={5}
        divider={
          <Divider variant="fullWidth" style={{ margin: ' 0 -3.7rem' }} />
        }
      >
        <YourAccountCredential />
        <EditId />
        <EmailAlias />
        <OtherAccount />
        <DeleteId />
      </Stack>
    </Stack>
  );
};

export default AccountManagementSettings;
