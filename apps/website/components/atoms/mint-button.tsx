import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';

import { PartialDeep } from 'type-fest';

import { Button, Stack } from '@mui/material';

import { TokenFilled } from '../../components/molecules/mint-card/assets/token-filled';
import { useBiconomyMint } from '../../hooks/use-mint';
import { Credentials } from '../../services/graphql/types.generated';
import { LoadingButton } from './loading-button';

type Props = {
  credential: PartialDeep<Credentials>;
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
    href={props.token_uri}
    target="_blank"
    {...props}
    startIcon={<TokenFilled height={20} width={20} color="action" />}
  >
    {props.children}
  </Button>
);

export const MintCredentialButton = ({ credential }: Props) => {
  const { mintCredential, mint } = useBiconomyMint();
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation('common');

  return (
    <Stack
      sx={{
        flex: 1,
        marginBottom: (theme) => theme.spacing(4),
      }}
    >
      {credential.status === 'minted' ? (
        <MintedButton
          token_uri={credential.uri}
          sx={{
            borderColor: '#E5E5E580',
            color: 'white',
          }}
        >
          {t('actions.check-transaction')}
        </MintedButton>
      ) : (
        <ToMintButton
          onClick={() => {
            setLoading(true);
            mintCredential(credential).finally(() => setLoading(false));
          }}
          isLoading={loading}
        >
          {t('actions.mint')}
        </ToMintButton>
      )}
    </Stack>
  );
};
