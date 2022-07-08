import Card from '@mui/material/Card';
import { useBiconomyMint } from '../../../hooks/use-mint';
import { useState, useEffect } from 'react';
import { processScreen } from './process';

export enum Subjects {
  default = 'mint:default',
  start = 'mint:start',
  minting = 'mint:processing',
  sign = 'mint:sign-in',
  failed = 'mint:failed',
  minted = 'mint:successful',
  alreadyMinted = 'mint:already',
}

export function MintCard() {
  const [mintProcessStatus, setMintProcessStatus] = useState<Subjects>(
    Subjects.default
  );

  const { mint: triggerMint, asksSignature } = useBiconomyMint();

  const mint = () => {
    const trigger = triggerMint();

    setMintProcessStatus(Subjects.minting);

    trigger.then((value) => {
      if (!value.error && value.isMinted) {
        setMintProcessStatus(Subjects.minted);
      } else {
        setMintProcessStatus(Subjects.failed);
      }
    });
  };

  useEffect(() => {
    asksSignature && setMintProcessStatus(Subjects.sign);
  }, [asksSignature]);

  return (
    <Card sx={{ width: '300px', height: '450px' }}>
      {processScreen(mintProcessStatus, setMintProcessStatus, mint)}
    </Card>
  );
}
