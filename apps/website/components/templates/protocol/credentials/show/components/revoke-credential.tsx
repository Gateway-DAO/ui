import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { PartialDeep } from 'type-fest/source/partial-deep';
import { useMutation } from 'wagmi';

import CancelIcon from '@mui/icons-material/Cancel';
import { Button, CircularProgress } from '@mui/material';

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
  const router = useRouter();
  const { gqlProtocolAuthMethods } = useAuth();
  const revokeCredential = useMutation(
    ['revokeCredential'],
    ({ id }: RevokeCredentialMutationVariables) => {
      return gqlProtocolAuthMethods.revokeCredential({ id });
    }
  );

  return (
    <>
      {credential.status === CredentialStatus.Valid && (
        <Button
          variant="outlined"
          color="error"
          sx={{ mb: 2 }}
          onClick={() =>
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
              }
            )
          }
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
    </>
  );
}
