import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { PartialDeep } from 'type-fest';

import { Dialog, DialogTitle, SxProps } from '@mui/material';

import { useBiconomy } from '../../../providers/biconomy';
import { Credentials } from '../../../services/graphql/types.generated';
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
  const { mintCredential: triggerMint, mintStatus } = useBiconomy();

  const mint = () => triggerMint(credential);

  useEffect(() => {
    const status = mintStatus[credential?.id];

    if (!status) {
      setScreen('mint');
      return;
    }

    status.askingSignature && setScreen('signin');
    status.minting && setScreen('minting');
    if (status.isMinted) {
      setScreen('successful');
      setTimeout(() => {
        setOpen(false);
        props.onMint && props.onMint();
      }, 2500);
    }
    status.error && setScreen('failed');
  }, [mintStatus[credential?.id]]);

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
