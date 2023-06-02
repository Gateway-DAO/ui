import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { TokenFilled } from '@/components/molecules/mint-card/assets/token-filled';
import { useBiconomy } from '@/providers/biconomy';
import { Credentials } from '@/services/hasura/types';
import { PartialDeep } from 'type-fest';

import { Button, Stack, SxProps } from '@mui/material';

import { LoadingButton } from './loading-button';

export type Props = {
  credential: PartialDeep<Credentials>;
  sx?: SxProps;
  disabled?: boolean;
};

const ToMintButton = (props) => (
  <LoadingButton
    variant="contained"
    {...props}
    startIcon={
      !props.isLoading && <TokenFilled height={20} width={20} color="action" />
    }
  >
    {props.children}
  </LoadingButton>
);
const MintedButton = (props) => (
  <Button
    variant="outlined"
    component="a"
    href={props.transaction_url}
    target="_blank"
    {...props}
    startIcon={<TokenFilled height={20} width={20} color="action" />}
  >
    {props.children}
  </Button>
);

export const MintCredentialButton = ({ credential, sx, disabled }: Props) => {
  const [status, setStatus] = useState<'to_mint' | 'minted'>(
    credential.status as 'to_mint' | 'minted'
  );
  const [transactionUrl, setTransactionUrl] = useState<string | null>(
    credential.transaction_url
  );
  const { mintCredential } = useBiconomy();
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation('common');

  return (
    <Stack
      sx={{
        flex: 1,
        marginBottom: (theme) => theme.spacing(3),
      }}
    >
      {status === 'minted' ? (
        <MintedButton
          transaction_url={transactionUrl}
          sx={{
            borderColor: '#E5E5E580',
            color: 'white',
            width: '100%',
            ...sx,
          }}
          disabled={disabled}
        >
          {t('actions.check-transaction')}
        </MintedButton>
      ) : (
        <ToMintButton
          onClick={() => {
            setLoading(true);
            mintCredential(credential)
              .then(({ isMinted, transactionUrl }) => {
                setStatus(isMinted ? 'minted' : 'to_mint');
                setTransactionUrl(isMinted && transactionUrl);
              })
              .finally(() => setLoading(false));
          }}
          isLoading={loading}
          sx={{
            width: '100%',
            ...sx,
          }}
          disabled={disabled}
        >
          {t('actions.mint')}
        </ToMintButton>
      )}
    </Stack>
  );
};
