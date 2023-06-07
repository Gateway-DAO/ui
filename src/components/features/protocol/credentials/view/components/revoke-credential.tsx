import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useState } from 'react';

import ConfirmDialog from '@/components/molecules/modal/confirm-dialog';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/providers/auth';
import {
  Protocol_Api_Credential,
  Protocol_Api_CredentialStatus,
  ProtocolMutationRevokeCredentialArgs,
} from '@/services/hasura/types';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { PartialDeep } from 'type-fest/source/partial-deep';

import CancelIcon from '@mui/icons-material/Cancel';
import { Button, CircularProgress } from '@mui/material';

type Props = {
  credential: PartialDeep<Protocol_Api_Credential>;
};

export function RevokeCredential({ credential }: Props) {
  const { t } = useTranslation('protocol');
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { hasuraUserService, me } = useAuth();
  const [confirmRevoke, setConfirmRevoke] = useState(false);
  const revokeCredential = useMutation(
    ['revokeCredential'],
    ({ id }: ProtocolMutationRevokeCredentialArgs) => {
      return hasuraUserService.protocol_revoke_credential({ id });
    }
  );

  return (
    <>
      {credential.status === Protocol_Api_CredentialStatus.Valid &&
        me?.wallet === credential?.issuerUser?.primaryWallet?.address && (
          <Button
            variant="outlined"
            color="error"
            sx={{ mb: 2 }}
            onClick={() => setConfirmRevoke(true)}
            startIcon={
              !revokeCredential.isLoading ? (
                <CancelIcon height={20} width={20} color="error" />
              ) : null
            }
          >
            {revokeCredential.isLoading ? (
              <CircularProgress size={20} />
            ) : (
              t('credential.actions.revoke')
            )}
          </Button>
        )}
      <ConfirmDialog
        title={t('credential.revoke-dialog-title')}
        open={confirmRevoke}
        positiveAnswer={t('credential.actions.revoke')}
        negativeAnswer={t('credential.actions.cancel')}
        setOpen={setConfirmRevoke}
        onConfirm={() =>
          revokeCredential.mutateAsync(
            { id: credential?.id },
            {
              onSuccess: () =>
                router.push({
                  pathname: ROUTES.PROTOCOL_CREDENTIAL,
                  query: {
                    id: credential?.id,
                  },
                }),
              onError: () =>
                enqueueSnackbar(t('credential.revoke-error-message')),
            }
          )
        }
      >
        {t('credential.revoke-dialog-text')}
      </ConfirmDialog>
    </>
  );
}
