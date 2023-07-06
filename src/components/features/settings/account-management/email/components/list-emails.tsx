import useTranslation from 'next-translate/useTranslation';

import Loading from '@/components/atoms/loadings/loading';
import MorePopover from '@/components/atoms/more-popover';
import { mutation } from '@/constants/queries';
import { useAuth } from '@/providers/auth';
import { Update_EmailMutationVariables } from '@/services/hasura/types';
import { queryClient } from '@/services/query-client';
import { brandColors } from '@/theme';
import { useMutation } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

import { Chip, Divider, Skeleton, Stack, Typography } from '@mui/material';

import { AuthenticationsItem, Modals } from '../../types';

type Props = {
  emails: AuthenticationsItem[];
  isLoading: boolean;
  onOpenModal: (data: Modals) => void;
};

export function ListEmails({ emails, isLoading, onOpenModal }: Props) {
  const { me, hasuraUserService, onInvalidateMe } = useAuth();

  const { t } = useTranslation('settings');

  const isPrimary = (item: AuthenticationsItem): boolean => {
    return item?.data?.email === item?.user?.email;
  };

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
          onOpenModal({ type: 'remove', email: item?.data?.email });
        },
        hidden: isPrimary(item),
      },
    ];
  };

  return (
    <>
      {isLoading ? (
        <Skeleton sx={{ height: 30 }} />
      ) : (
        <Stack
          divider={
            <Divider sx={{ margin: { md: '0 -3.7rem', xs: '0 -1.5rem' } }} />
          }
        >
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
              <Stack height={32} width={40}>
                {emails.length > 1 && !isPrimary(item) && (
                  <>
                    {updateEmail?.isLoading &&
                    updateEmail.variables?.email === item.data?.email ? (
                      <Loading size={24} marginTop={0} />
                    ) : (
                      <MorePopover
                        options={options(item)}
                        withBackground
                        key={uuidv4()}
                      />
                    )}
                  </>
                )}
              </Stack>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
}
