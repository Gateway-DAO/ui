import useTranslation from 'next-translate/useTranslation';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import Loading from '@/components/atoms/loadings/loading';
import MorePopover from '@/components/atoms/more-popover';
import { TitleSubtitleField } from '@/components/atoms/title-field';
import { mutation } from '@/constants/queries';
import { useAuth } from '@/providers/auth';
import {
  Protocol_Remove_EmailMutationVariables,
  Update_EmailMutationVariables,
} from '@/services/hasura/types';
import { queryClient } from '@/services/query-client';
import { useMutation } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

import { Divider, Skeleton, Stack, Typography } from '@mui/material';

import { AuthenticationsItem } from './wallet-types';

type Props = {
  wallets: AuthenticationsItem[];
  isLoading: boolean;
};

export function WalletAlias({ wallets, isLoading }: Props) {
  const { me, hasuraUserService, onInvalidateMe } = useAuth();
  const { t } = useTranslation('settings');

  const deleteEmail = useMutation(
    [mutation.remove_email],
    ({ email }: Protocol_Remove_EmailMutationVariables) => {
      return hasuraUserService.protocol_remove_email({
        email,
      });
    },
    {
      onSuccess: () =>
        queryClient.refetchQueries([
          'authentications_methods_by_user',
          { id: me?.protocolUser?.id },
        ]),
    }
  );

  const updateEmail = useMutation(
    [mutation.remove_email],
    ({
      id,
      id_protocol,
      email,
      email_protocol,
    }: Update_EmailMutationVariables) => {
      return hasuraUserService.update_email({
        id,
        id_protocol,
        email,
        email_protocol,
      });
    },
    {
      onSuccess: () => {
        onInvalidateMe();
        queryClient.refetchQueries([
          'authentications_methods_by_user',
          { id: me?.protocolUser?.id },
        ]);
      },
    }
  );

  const options = (item: AuthenticationsItem) => {
    return [
      {
        text: t('account-management.set-as-primary'),
        action: () => {
          updateEmail.mutateAsync({
            id: me?.id,
            id_protocol: me?.protocolUser?.id,
            email: item?.data?.email,
            email_protocol: item?.data?.email,
          });
        },
        hidden: false,
      },
      {
        text: t('account-management.disconnect'),
        action: () => {
          deleteEmail.mutateAsync({
            email: item?.data?.email,
          });
        },
        hidden: false,
      },
    ];
  };

  return (
    <Stack gap={3}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <TitleSubtitleField
          title={t('account-management.wallet-section-title')}
          subtitle={t('account-management.wallet-section-desc')}
        />
        <LoadingButton variant="text" sx={{ display: 'none' }}>
          {t('account-management.wallet-section-btn')}
        </LoadingButton>
      </Stack>
      {isLoading ? (
        <Skeleton sx={{ height: 30 }} />
      ) : (
        <Stack divider={<Divider sx={{ margin: ' 0 -3.7rem' }} />}>
          {wallets.map((item, index) => (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              gap={2}
              py={2}
              key={index}
            >
              <Typography sx={{ flexGrow: 1 }}>{item?.data?.email}</Typography>
              {wallets.length > 1 && (
                <Stack height={32}>
                  {(deleteEmail?.isLoading &&
                    deleteEmail.variables?.email === item.data?.email) ||
                  (updateEmail?.isLoading &&
                    updateEmail.variables?.email === item.data?.email) ? (
                    <Loading size={24} marginTop={0} />
                  ) : (
                    <MorePopover
                      options={options(item)}
                      withBackground
                      key={uuidv4()}
                    />
                  )}
                </Stack>
              )}
            </Stack>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
