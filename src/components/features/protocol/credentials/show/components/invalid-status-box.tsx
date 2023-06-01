import useTranslation from 'next-translate/useTranslation';

import {
  Credential,
  CredentialStatus,
} from '@/services/gateway-protocol/types';
import { brandColors } from '@/theme';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Alert, AlertTitle } from '@mui/material';

type Props = {
  credential: PartialDeep<Credential>;
};

export function InvalidStatusBox({ credential }: Props) {
  const { t } = useTranslation('protocol');

  return (
    <>
      {credential.status === CredentialStatus.Invalid && (
        <Alert
          variant="outlined"
          severity="error"
          sx={{
            borderRadius: 2,
            borderColor: '#FF002E',
            '.MuiAlert-icon': {
              alignItems: 'center',
            },
          }}
        >
          <AlertTitle
            sx={{
              fontWeight: 600,
              color: brandColors.red.main,
            }}
          >
            {t('credential.alert-title')}
          </AlertTitle>
          {t('credential.alert-description')}
        </Alert>
      )}
    </>
  );
}