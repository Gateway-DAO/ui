import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';

import { query } from '@/constants/queries';
import { useAuth } from '@/providers/auth';
import { Protocol_Api_AuthType } from '@/services/hasura/types';
import { useQuery } from '@tanstack/react-query';

import { Divider, Stack, Typography } from '@mui/material';

import { DeleteId } from './delete-id/delete-id';
import { EditId } from './edit-id/edit-id';
import { EmailAlias } from './email/email-alias';
import { OtherAccount } from './others-accounts/other-accounts';
import { WalletAlias } from './wallet/wallet-alias';

const AccountManagementSettings = () => {
  const { t } = useTranslation('settings');
  const { hasuraUserService, me, isAuthenticated } = useAuth();

  const { data: authentications, isLoading } = useQuery(
    [query.authentications_methods_by_user, { id: me?.protocolUser?.id }],
    () =>
      hasuraUserService.authentications_methods_by_user({
        id: me?.protocolUser?.id,
      }),
    {
      select: (data) => data?.protocol_user_by_pk?.authentications,
      enabled: isAuthenticated,
    }
  );

  const emails = useMemo(() => {
    return (
      authentications?.filter((a) => a.type === Protocol_Api_AuthType.Email) ??
      []
    );
  }, [authentications]);

  const wallets = useMemo(() => {
    return (
      authentications?.filter((a) => a.type === Protocol_Api_AuthType.Wallet) ??
      []
    );
  }, [authentications]);

  return (
    <Stack width={'100%'} marginBottom={4} sx={{ px: { xs: 1, md: 0 } }}>
      <Typography variant="h6" sx={{ mb: 7 }}>
        {t('nav.account-management-title')}
      </Typography>
      <Stack
        gap={5}
        divider={
          <Divider
            variant="fullWidth"
            sx={{ margin: { md: '0 -3.7rem', xs: '0 -1.5rem' } }}
          />
        }
      >
        {/* <YourAccountCredential /> */}
        {/* <EditId />
        <EmailAlias emails={emails ?? []} isLoading={isLoading} />
        <WalletAlias wallets={wallets ?? []} isLoading={isLoading} /> */}
        <OtherAccount />
        <DeleteId />
      </Stack>
    </Stack>
  );
};

export default AccountManagementSettings;
