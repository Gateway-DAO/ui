import { useState, useEffect } from 'react';

import { PartialDeep } from 'type-fest';

import { Box, Button, SxProps } from '@mui/material';
import Card from '@mui/material/Card';

import { useCredential } from '@/hooks/use-credential';
import { useBiconomy } from '../../../providers/biconomy';
import { Credentials } from '@/services/hasura/types';
import { processScreen } from './process';

export enum Subjects {
  default = 'mint:default',
  start = 'mint:start',
  minting = 'mint:processing',
  sign = 'mint:sign-in',
  failed = 'mint:failed',
  successful = 'mint:successful',
  alreadyMinted = 'mint:already',
}

type MintCardProps = {
  tokenURI?: string;
  nftURL?: string;
  onMint?: () => void;
  credential: PartialDeep<Credentials>;
  sx?: SxProps;
};

export const MintCard = ({ credential, sx, ...props }: MintCardProps) => {
  const [mintProcessStatus, setMintProcessStatus] = useState<Subjects>(
    Subjects.default
  );
  const [error, setError] = useState<any | null>(null);

  // const { mintCredential: triggerMint, mintStatus } = useBiconomy();
  const {
    mintCredential: triggerMint,
    status,
    resetStatus,
  } = useCredential(credential);

  const mint = () => triggerMint(credential);

  useEffect(() => {
    (!status || status == 'idle') &&
      setMintProcessStatus(
        credential.status == 'minted'
          ? Subjects.alreadyMinted
          : Subjects.default
      );
    status == 'asking_signature' && setMintProcessStatus(Subjects.sign);
    status == 'minting' && setMintProcessStatus(Subjects.minting);
    if (status == 'minted') {
      setMintProcessStatus(Subjects.successful);
      setTimeout(() => {
        props.onMint && props.onMint();
        setMintProcessStatus(Subjects.alreadyMinted);
        // resetStatus();
      }, 2500);
    }
    status == 'error' && setMintProcessStatus(Subjects.failed);
  }, [status, credential]);

  return (
    <Card
      sx={{
        width: '275px',
        height: '443px',
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
    >
      {processScreen(mintProcessStatus, setMintProcessStatus, mint, {
        error,
        credential,
      })}
    </Card>
  );
};

export default MintCard;
