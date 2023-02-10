import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useSnackbar } from 'notistack';
import { PartialDeep } from 'type-fest/source/partial-deep';
import { useMutation } from 'wagmi';

import CancelIcon from '@mui/icons-material/Cancel';
import { Button, CircularProgress } from '@mui/material';

import ConfirmDialog from '../../../../../../components/organisms/confirm-dialog/confirm-dialog';
import { ROUTES } from '../../../../../../constants/routes';
import { useAuth } from '../../../../../../providers/auth';
import {
  Credential,
  CredentialStatus,
  RevokeCredentialMutationVariables,
} from '../../../../../../services/gateway-protocol/types';

type Props = {
  credential: PartialDeep<Credential>;
};

export function RevokeCredential({ credential }: Props) {
  const { t } = useTranslation('protocol');
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { gqlProtocolAuthMethods, me } = useAuth();
  const [confirmRevoke, setConfirmRevoke] = useState(false);
  const revokeCredential = useMutation(
    ['revokeCredential'],
    ({ id }: RevokeCredentialMutationVariables) => {
      return gqlProtocolAuthMethods.revokeCredential({ id });
    }
  );

  return (
    <>
      {credential.status === CredentialStatus.Valid &&
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