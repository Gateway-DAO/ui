<<<<<<< Updated upstream
import useTranslation from 'next-translate/useTranslation';
import { useRef, useState } from 'react';

import { useQueries } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { useSnackbar } from 'notistack';
import { useController, useFormContext } from 'react-hook-form';
import { useDropArea } from 'react-use';
import { useProvider } from 'wagmi';

import { Delete } from '@mui/icons-material';
import { Button, Paper, Stack, TextField } from '@mui/material';

import { CreateGateData, Gate_Whitelisted_Wallet } from '../../schema';
import { DirectWalletsChips } from './direct-wallets-chips';
import { DirectWalletsHeader } from './direct-wallets-header';
=======
import { useEffect } from 'react';
>>>>>>> Stashed changes

import { io } from 'socket.io-client';
const socket = io(process.env.NEXT_PUBLIC_NODE_ENDPOINT);
export function DirectWallets() {
<<<<<<< Updated upstream
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController<CreateGateData>({
    name: 'whitelisted_wallets',
    defaultValue: [],
  });
  const { setValue } = useFormContext<CreateGateData>();
  const { t } = useTranslation('common');

  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const provider = useProvider();
  const { enqueueSnackbar } = useSnackbar();

  const wallets = value as Gate_Whitelisted_Wallet[];

  const walletsQueries = useQueries({
    queries: wallets.map(({ wallet, ens }, index) => ({
      queryKey: ['address-validate', wallet, ens],
      queryFn: async (): Promise<string> => {
        if (ens && !wallet) {
          /* Check if ENS name is valid */
          const address = await provider.resolveName(ens);
          if (!address) {
            throw new Error('Invalid ENS name');
          }
          return address;
        }

        if (ens && wallet) {
          return wallet;
        }

        return ethers.utils.getAddress(wallet);
      },
      onSuccess(data: string) {
        if (ens && !wallet) {
          setValue(`whitelisted_wallets.${index}.wallet`, data);
        }
      },
    })),
  });

  const onDelete = (index: number) => () => {
    const newWallets = [...wallets];
    newWallets.splice(index, 1);
    onChange(newWallets);
  };

  const onEdit = (wallet: string, index: number) => () => {
    const newWallets = [...wallets];
    newWallets.splice(index, 1);
    onChange(newWallets);
    setInputValue(wallet);
    inputRef.current?.focus();
  };

  const onParseText = (text: string) => {
    const newWallets = text.split(/[,\n\s\r\t]+/g).reduce((acc, wallet) => {
      if (!wallet.length) return acc;
      if (
        wallets.some(
          (whitelistedWallet) =>
            whitelistedWallet.wallet === wallet ||
            whitelistedWallet.ens === wallet
        )
      ) {
        enqueueSnackbar(`Duplicated wallet ${wallet}`, { variant: 'warning' });
        return acc;
      }

      const obj: Gate_Whitelisted_Wallet = ethers.utils.isAddress(wallet)
        ? { wallet }
        : { ens: wallet };
      return [...acc, obj];
    }, [] as string[]);

    onChange([...wallets, ...newWallets]);
  };

  const readFiles = (files: FileList | File[]) => {
    const file = files[0];

    if (file.type !== 'text/csv') return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      onParseText(text);
=======
  useEffect(() => {
    return () => {
      socket.disconnect();
>>>>>>> Stashed changes
    };
  }, []);
  return <></>;
}
