import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

import { Button } from '@mui/material';

import { useAuth } from '../../providers/auth';
import { CredentialQuery } from '../../services/hasura/types';
import { TokenFilled } from './mint-card/assets/token-filled';

type Props = {
  credential: CredentialQuery;
  completedGate: React.ReactNode;
  setMintModal: (value: boolean) => void;
};

export default function GateMintButton({
  credential,
  completedGate,
  setMintModal,
}: Props) {
  const { me } = useAuth();
  const { t } = useTranslation('credential');

  return (
    <>
      {completedGate &&
        !!credential &&
        credential?.credentials_by_pk?.target_id == me?.id &&
        (credential?.credentials_by_pk?.status == 'minted' ? (
          <Button
            component="a"
            variant="outlined"
            size="large"
            href={credential.credentials_by_pk.transaction_url}
            target="_blank"
            startIcon={<TokenFilled height={20} width={20} color="action" />}
            fullWidth
            sx={{
              borderColor: '#E5E5E580',
              color: 'white',
              mb: 2,
            }}
          >
            {t('mint.verify_mint_transaction')}
          </Button>
        ) : (
          <Button
            variant="contained"
            size="large"
            startIcon={<TokenFilled height={20} width={20} color="action" />}
            fullWidth
            onClick={() => setMintModal(true)}
            sx={{
              mb: 2,
            }}
          >
            {t('mint.mint_nft')}
          </Button>
        ))}
    </>
  );
}
