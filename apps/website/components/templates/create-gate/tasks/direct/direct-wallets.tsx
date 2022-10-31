import { useEffect, useRef, useState } from 'react';

import { useQueries } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { useDropArea } from 'react-use';
import { useProvider } from 'wagmi';

import { Delete } from '@mui/icons-material';
import { Button, Paper, Stack, TextField } from '@mui/material';

import { DirectWalletsChips } from './direct-wallets-chips';
import { DirectWalletsHeader } from './direct-wallets-header';

export function DirectWallets() {
  const [wallets, setWallets] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const provider = useProvider();

  const walletsQueries = useQueries({
    queries: wallets.map((wallet) => ({
      queryKey: ['address-validate', wallet],
      queryFn: async (): Promise<string> => {
        if (ethers.utils.isAddress(wallet)) {
          /* Check if wallet address is valid */
          return ethers.utils.getAddress(wallet);
        }
        /* Check if ENS name is valid */
        const address = await provider.resolveName(wallet);
        if (!address) {
          throw new Error('Invalid ENS name');
        }
        return address;
      },
    })),
  });

  const onDelete = (index: number) => () => {
    const newWallets = [...wallets];
    newWallets.splice(index, 1);
    setWallets(newWallets);
  };

  const onEdit = (wallet: string, index: number) => () => {
    const newWallets = [...wallets];
    newWallets.splice(index, 1);
    setWallets(newWallets);
    setInputValue(wallet);
    inputRef.current?.focus();
  };

  const onParseText = (text: string) => {
    const newWallets = text.split(/[,\n\s]/g).reduce((acc, wallet) => {
      const trimmedWallet = wallet.trim();
      if (trimmedWallet.length && !wallets.includes(trimmedWallet)) {
        return [...acc, trimmedWallet];
      }
      return acc;
    }, [] as string[]);

    setWallets((prev) => [...prev, ...newWallets]);
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
            startAdornment: wallets.length ? (
              <DirectWalletsChips
                wallets={wallets}
                walletsQueries={walletsQueries}
                onDelete={onDelete}
                onEdit={onEdit}
              ></DirectWalletsChips>
            ) : null,
          }}
          helperText="Fill the addresses separated by comma"
          value={inputValue}
          ref={inputRef}
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
            const text = e.clipboardData.getData('text');
            onParseText(text);
            e.preventDefault();
          }}
        />
        <Button
          sx={{ alignSelf: 'flex-end' }}
          startIcon={<Delete />}
          variant="outlined"
          onClick={() => setWallets([])}
        >
          Reset
        </Button>
      </Stack>
    </Paper>
  );
}
