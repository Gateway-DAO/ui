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
}

export const MintCard = (props: MintCardProps) => {
  const [mintProcessStatus, setMintProcessStatus] = useState<Subjects>(
    Subjects.default
  );

  const { mint: triggerMint, asksSignature } = useBiconomyMint();

  const mint = () => {
    const trigger = triggerMint(props.tokenURI || null);

    setMintProcessStatus(Subjects.minting);

    trigger.then((value) => {
      if (!value.error && value.isMinted) {
        setMintProcessStatus(Subjects.successful);
        setTimeout(() => {
          setMintProcessStatus(Subjects.alreadyMinted);
          props.onMint();
        }, 2500);
      } else {
        setMintProcessStatus(Subjects.failed);
      }
    });
  };

  useEffect(() => {
    if (props.minted) {
      setMintProcessStatus(Subjects.alreadyMinted);
    }
    else {
      setMintProcessStatus(Subjects.default);
    }
  }, [props.minted]);

  useEffect(() => {
    asksSignature && setMintProcessStatus(Subjects.sign);
  }, [asksSignature]);

  return (
    <Card sx={{ width: '300px', height: '450px' }}>
      {processScreen(mintProcessStatus, setMintProcessStatus, mint, {
        title: props.title,
        description: props.description,
        image: props.image,
        categories: props.categories,
        nft_url: props.nftURL,
      })}
    </Card>
  );
}

export default MintCard;