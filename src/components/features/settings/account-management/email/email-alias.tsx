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
import { brandColors } from '@/theme';
import { useMutation } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

import { Chip, Divider, Skeleton, Stack, Typography } from '@mui/material';

import { AuthenticationsItem } from './email-types';

type Props = {
  emails: AuthenticationsItem[];
  isLoading: boolean;
};

export function EmailAlias({ emails, isLoading }: Props) {
  const { me, hasuraUserService, onInvalidateMe } = useAuth();
  const { t } = useTranslation('settings');

  const isPrimary = (item: AuthenticationsItem): boolean => {
    return item?.data?.email === item?.user?.email;
  };

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
        hidden: isPrimary(item),
      },
      {
        text: t('account-management.disconnect'),
        action: () => {
          deleteEmail.mutateAsync({
            email: item?.data?.email,
          });
        },
        hidden: isPrimary(item),
      },
    ];
  };

  return (
    <Stack gap={3}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <TitleSubtitleField
          title={t('account-management.email-section-title')}
          subtitle={t('account-management.email-section-desc')}
        />
        <LoadingButton variant="text" sx={{ display: 'none' }}>
          {t('account-management.email-section-btn')}
        </LoadingButton>
      </Stack>
      {isLoading ? (
        <Skeleton sx={{ height: 30 }} />
      ) : (
        <Stack divider={<Divider sx={{ margin: ' 0 -3.7rem' }} />}>
          {emails.map((item, index) => (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              gap={2}
              py={2}
              key={index}
            >
              <Typography sx={{ flexGrow: 1 }}>{item?.data?.email}</Typography>
              {isPrimary(item) && (
                <Chip
                  label={t('account-management.primary')}
                  color="success"
                  size="small"
                  sx={{ backgroundColor: brandColors.green.main }}
                />
              )}
              {emails.length > 1 && !isPrimary(item) && (
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
