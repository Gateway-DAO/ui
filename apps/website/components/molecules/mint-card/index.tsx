import Card from '@mui/material/Card';
import { useBiconomyMint } from '../../../hooks/use-mint';
import { useState, useEffect } from 'react';
import { processScreen } from './process';
import { Box, Button } from '@mui/material';

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
  minted: boolean;
  tokenURI?: string;
  nftURL?: string;
  title: string;
  description: string;
  image: string;
  categories: string[];
  onMint?: () => void;
};

export const MintCard = (props: MintCardProps) => {
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
    if (props.minted) {
      setMintProcessStatus(Subjects.alreadyMinted);
    } else {
      setMintProcessStatus(Subjects.default);
    }
  }, [props.minted]);

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
      }}
    >
      {processScreen(mintProcessStatus, setMintProcessStatus, mint, {
        title: props.title,
        description: props.description,
        image: props.image,
        categories: props.categories,
        nft_url: props.nftURL,
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
