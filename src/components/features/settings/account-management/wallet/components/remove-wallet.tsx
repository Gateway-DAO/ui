import useTranslation from 'next-translate/useTranslation';

import Loading from '@/components/atoms/loadings/loading';
import { ConfirmDelete } from '@/components/organisms/confirm-delete/confirm-delete';
import { mutation } from '@/constants/queries';
import { useAuth } from '@/providers/auth';
import { Protocol_Remove_EmailMutationVariables } from '@/services/hasura/types';
import { brandColors } from '@/theme';
import { useMutation } from '@tanstack/react-query';

import { Divider, Stack, Typography } from '@mui/material';

type Props = {
  wallet: string;
  onSuccess: () => void;
  onCancel: () => void;
};

export function RemoveWallet({ wallet, onSuccess, onCancel }: Props) {
  const { hasuraUserService, me } = useAuth();
  const { t } = useTranslation('settings');

  const deleteWalletMutation = useMutation(
    [mutation.remove_wallet],
    ({ email }: Protocol_Remove_EmailMutationVariables) => {
      return hasuraUserService.protocol_remove_email({
        email,
      });
    },
    {
      onSuccess,
    }
  );

  return (
    <>
      {deleteWalletMutation?.isLoading ? (
        <Loading />
      ) : (
        <Stack>
          <Typography fontWeight={600} sx={{ mb: 4 }}>
            {t('common:modal-confirm-delete.subtitle')}
          </Typography>
          <Stack divider={<Divider />} gap={2} sx={{ mb: 5 }}>
            <Typography>
              {t('common:modal-confirm-delete.text1')} <b>{wallet}</b>
            </Typography>
            <Typography sx={{ color: brandColors.red.main }}>
              {t('common:modal-confirm-delete.text2a')} <b>{wallet}</b>{' '}
              {t('common:modal-confirm-delete.text2b')}{' '}
              {me?.protocolUser?.gatewayId}{' '}
              {t('common:modal-confirm-delete.text2c')}
            </Typography>
            <Typography>{t('common:modal-confirm-delete.text3')}</Typography>
          </Stack>
          <Divider variant="fullWidth" sx={{ margin: ' 0 -3.7rem' }} />
          <ConfirmDelete
            textKey={t(
              'account-management.modal-delete-email.disconnect-my-account'
            )}
            buttonText={t(
              'account-management.modal-delete-email.disconnect-account'
            )}
            checkText={t('account-management.modal-delete-email.checkbox-info')}
            onCancel={onCancel}
            onConfirm={() =>
              deleteWalletMutation.mutateAsync({ email: wallet })
            }
          />
        </Stack>
      )}
    </>
  );
}
