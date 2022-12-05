import { Dialog, DialogTitle, SxProps } from '@mui/material';
import { Credentials } from '../../../services/graphql/types.generated';
import { PartialDeep } from 'type-fest';
import { Dispatch, SetStateAction, useState } from 'react';
import { useBiconomy } from '../../../providers/biconomy';
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
  const [error, setError] = useState<any | null>(null);
  const { mintCredential: triggerMint } = useBiconomy();

  const mint = () => {
    const trigger = triggerMint(credential);

    setScreen('minting');

    trigger.then((value) => {
      if (!value.error && value.isMinted) {
        setScreen('successful');
        setTimeout(() => {
          setOpen(false);
          props.onMint && props.onMint();
        }, 2500);
      } else {
        setError(value.error);
        setScreen('failed');
      }
    });
  };

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
