import useTranslation from 'next-translate/useTranslation';
import { useRef, useState } from 'react';

import { useQueries } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { useController } from 'react-hook-form';
import { useDropArea } from 'react-use';
import { useProvider } from 'wagmi';

import { Delete } from '@mui/icons-material';
import { Button, Paper, Stack, TextField } from '@mui/material';

import { CreateGateData, Gate_Whitelisted_Wallet } from '../../schema';
import { DirectWalletsChips } from './direct-wallets-chips';
import { DirectWalletsHeader } from './direct-wallets-header';

export function DirectWallets() {
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController<CreateGateData>({
    name: 'whitelisted_wallets',
    defaultValue: [],
  });
  const { t } = useTranslation('common');
  const wallets = value as Gate_Whitelisted_Wallet[];
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const provider = useProvider();

  const walletsQueries = useQueries({
    queries: wallets.map(({ wallet, ens }, index) => ({
      queryKey: ['address-validate', wallet, ens],
      queryFn: async (): Promise<string> => {
        if (ens && !wallet) {
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
        /* Check if ENS name is valid */
      },
      onSuccess(data: string) {
        if (ens && !wallet) {
          const newWallets = [...wallets];
          newWallets[index] = { wallet: data, ens };
          onChange(newWallets);
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
      if (
        wallet.length &&
        !wallets.some(
          (whitelistedWallet) =>
            whitelistedWallet.wallet === wallet ||
            whitelistedWallet.ens === wallet
        )
      ) {
        const obj: Gate_Whitelisted_Wallet = ethers.utils.isAddress(wallet)
          ? { wallet }
          : { ens: wallet };
        return [...acc, obj];
      }
      return acc;
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
    };
    reader.readAsText(file);
  };

  const [dropBond, { over: isOver }] = useDropArea({
    onFiles: readFiles,
  });

  return (
    <Paper
      elevation={1}
      sx={[
        {
          px: { xs: 2, lg: 6 },
          py: { xs: 3, lg: 6 },
          display: 'flex',
          flexFlow: 'column',
          gap: 4,
          transition: 'opacity 0.25s ease',
        },
        isOver && {
          opacity: 0.5,
        },
      ]}
      {...dropBond}
    >
      <DirectWalletsHeader
        readFiles={readFiles}
        walletsQueries={walletsQueries}
      ></DirectWalletsHeader>
      <Stack direction="column" gap={1}>
        <TextField
          label={t('gate-new:direct.label')}
          sx={{
            display: 'flex',
            '.MuiInputBase-root': {
              flexDirection: 'column',
              p: 1.75,
              gap: 1,
              alignItems: 'flex-start',
            },
            '.MuiInputBase-input': { p: 0 },
          }}
          InputProps={{
            startAdornment: wallets?.length ? (
              <DirectWalletsChips
                wallets={wallets}
                walletsQueries={walletsQueries}
                onDelete={onDelete}
                onEdit={onEdit}
              ></DirectWalletsChips>
            ) : null,
          }}
          helperText={
            // Wrong type error
            error?.message ?? t('gate-new:direct.input-helper')
          }
          value={inputValue}
          inputRef={(input) => {
            inputRef.current = input;
            ref(input);
          }}
          error={!!error?.message}
          onKeyDown={(event) => {
            if (
              event.key === 'Enter' ||
              event.key === ',' ||
              event.code === 'Space'
            ) {
              event.preventDefault();
              if (inputValue.length) {
                onParseText(inputValue);
                setInputValue('');
              }
            }
          }}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onPaste={(e) => {
            e.preventDefault();
            const text = e.clipboardData.getData('text');
            onParseText(text);
            setInputValue('');
          }}
        />
        <Button
          sx={{ alignSelf: 'flex-end' }}
          startIcon={<Delete />}
          variant="outlined"
          onClick={() => onChange([])}
        >
          {t('actions.clear')}
        </Button>
      </Stack>
    </Paper>
  );
}
