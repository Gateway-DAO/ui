import { useState, useEffect } from 'react';

import { PartialDeep } from 'type-fest';

import { Box, Button, SxProps } from '@mui/material';
import Card from '@mui/material/Card';

import { useBiconomyMint } from '../../../hooks/use-mint';
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

  const { mint: triggerMint, asksSignature } = useBiconomyMint();

  const mint = () => {
    const trigger = triggerMint(props.tokenURI || null);

    setMintProcessStatus(Subjects.minting);

    trigger.then((value) => {
      if (!value.error && value.isMinted) {
        setMintProcessStatus(Subjects.successful);
        setTimeout(() => {
          setMintProcessStatus(Subjects.alreadyMinted);
          props.onMint && props.onMint();
        }, 2500);
      } else {
        setError(value.error);
        setMintProcessStatus(Subjects.failed);
      }
    });
  };

  useEffect(() => {
    if (credential.status == 'minted') {
      setMintProcessStatus(Subjects.alreadyMinted);
    } else {
      setMintProcessStatus(Subjects.default);
    }
  }, [credential.status]);

  useEffect(() => {
    asksSignature && setMintProcessStatus(Subjects.sign);
  }, [asksSignature]);

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
        title: credential.name,
        description: credential.description,
        image: credential.image,
        categories: credential.categories,
        nft_url: props.nftURL,
        target_id: credential.target_id,
        error,
      })}
      {(mintProcessStatus === Subjects.start ||
        (mintProcessStatus === Subjects.failed && Subjects.failed)) && (
        <Box sx={{ mx: 2, my: 1 }}>
          <Button
            size="large"
            variant="outlined"
            fullWidth
            onClick={() => setMintProcessStatus(Subjects.default)}
          >
            cancel
          </Button>
        </Box>
      )}
    </Card>
  );
};

export default MintCard;
