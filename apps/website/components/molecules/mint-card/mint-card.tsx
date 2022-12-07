import { useState, useEffect } from 'react';

import { PartialDeep } from 'type-fest';

import { Box, Button, SxProps } from '@mui/material';
import Card from '@mui/material/Card';

import { useBiconomy } from '../../../providers/biconomy';
import { Credentials } from '../../../services/graphql/types.generated';
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

  const { mintCredential: triggerMint, mintStatus } = useBiconomy();

  const mint = () => triggerMint(credential);

  useEffect(() => {
    const status = mintStatus[credential?.id];

    if (!status) {
      setMintProcessStatus(
        credential.status == 'minted'
          ? Subjects.alreadyMinted
          : Subjects.default
      );
      return;
    }

    status.askingSignature && setMintProcessStatus(Subjects.sign);
    status.minting && setMintProcessStatus(Subjects.minting);
    if (status.isMinted) {
      setMintProcessStatus(Subjects.successful);
      setTimeout(() => {
        setMintProcessStatus(Subjects.alreadyMinted);
        props.onMint && props.onMint();
      }, 2500);
    }
    status.error && setMintProcessStatus(Subjects.failed);
  }, [mintStatus[credential?.id]]);

  // useEffect(() => {
  //   if (credential.status == 'minted') {
  //     setMintProcessStatus(Subjects.alreadyMinted);
  //   } else {
  //     setMintProcessStatus(Subjects.default);
  //   }
  // }, [credential.status]);

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
