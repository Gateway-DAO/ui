import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useCredential } from '@/hooks/use-credential';
import { Credentials } from '@/services/hasura/types';
import { PartialDeep } from 'type-fest';

import { Dialog, DialogTitle, SxProps } from '@mui/material';

import { MintSelect } from './screen/mint-select';
import { Minting } from './screen/minting';

export type MintDialogProps = {
  tokenURI?: string;
  nftURL?: string;
  onMint?: () => void;
  credential?: PartialDeep<Credentials>;
  sx?: SxProps;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

type ScreenTypes = 'mint' | 'minting' | 'successful' | 'failed' | 'signin';

export function MintDialog({
  credential,
  isOpen,
  setOpen,
  ...props
}: MintDialogProps) {
  const [screen, setScreen] = useState<ScreenTypes>('mint');
  // const { mintCredential: triggerMint, mintStatus } = useBiconomy();
  const { mintCredential: triggerMint, status } = useCredential(credential);

  const mint = () => triggerMint(credential);

  useEffect(() => {
    if (!status) {
      setScreen('mint');
      return;
    }

    status == 'asking_signature' && setScreen('signin');
    status == 'minting' && setScreen('minting');
    if (status == 'minted') {
      setScreen('successful');
      setTimeout(() => {
        setOpen(false);
        props.onMint && props.onMint();
      }, 2500);
    }
    status == 'error' && setScreen('failed');
  }, [status]);

  const DialogScreen = {
    mint: <MintSelect {...{ setScreen, mint, setOpen }} />,
    minting: <Minting {...{ screen, setScreen, mint, setOpen }} />,
    signin: <Minting {...{ screen, setScreen, mint, setOpen }} />,
    successful: <Minting {...{ screen, setScreen, mint, setOpen }} />,
    failed: <Minting {...{ screen, setScreen, mint, setOpen }} />,
  };

  return (
    <Dialog open={isOpen} keepMounted={false} fullWidth maxWidth="xs">
      <DialogTitle sx={{ pb: 0.5 }}>Mint as NFT</DialogTitle>
      {DialogScreen[screen]}
    </Dialog>
  );
}
