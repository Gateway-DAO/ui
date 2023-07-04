import useTranslation from 'next-translate/useTranslation';

import { query } from '@/constants/queries';
import { useAuth } from '@/providers/auth';
import { useQuery } from '@tanstack/react-query';

import { Divider, Stack, Typography } from '@mui/material';

import { DeleteId } from './delete-id/delete-id';
import { EditId } from './edit-id/edit-id';
import { EmailAlias } from './email/email-alias';
import { OtherAccount } from './others-accounts/other-accounts';
import { YourAccountCredential } from './your-account/your-account-credential';

const AccountManagementSettings = () => {
  const { t } = useTranslation('settings');
  const { hasuraUserService, me, authenticated } = useAuth();

  const { data: authentications, isLoading } = useQuery(
    [query.authentications_methods_by_user, { id: me?.protocolUser?.id }],
    () =>
      hasuraUserService.authentications_methods_by_user({
        id: me?.protocolUser?.id,
      }),
    {
      select: (data) => data?.protocol_user_by_pk?.authentications,
      enabled: authenticated,
    }
  );

  return (
    <Stack width={'100%'} marginBottom={4}>
      <Typography variant="h6" sx={{ mb: 7 }}>
        {t('nav.account-management-title')}
      </Typography>
      <Stack
        gap={5}
        divider={<Divider variant="fullWidth" sx={{ margin: ' 0 -3.7rem' }} />}
      >
        <YourAccountCredential />
        <EditId />
        <EmailAlias authentications={authentications} isLoading={isLoading} />
        <OtherAccount />
        <DeleteId />
      </Stack>
    </Stack>
  );
};

export default AccountManagementSettings;
