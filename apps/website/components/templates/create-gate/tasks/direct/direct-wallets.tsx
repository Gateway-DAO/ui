import { useRef, useState } from 'react';

import { useQueries } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { useSnackbar } from 'notistack';
import { useProvider } from 'wagmi';

import { UploadFile } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

type Wallet = {
  input: string;
  address?: string;
};

export function DirectWallets() {
  const [wallets, setWallets] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const { enqueueSnackbar } = useSnackbar();
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
    const newWallets = text
      .split(/[,\n\s]/g)
      .map((wallet) => wallet.trim())
      .filter((wallet) => wallet.length && !wallets.includes(wallet));

    setWallets((prev) => [...prev, ...newWallets]);
  };

  return (
    <Paper
      elevation={1}
      sx={{
        px: { xs: 2, lg: 6 },
        py: { xs: 3, lg: 6 },
        display: 'flex',
        flexFlow: 'column',
        gap: 4,
      }}
    >
      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        alignItems={{ xs: 'flex-start', lg: 'center' }}
        justifyContent="space-between"
        gap={2}
      >
        <Box>
          <Typography variant="h6">0 recipients</Typography>
          <Typography variant="body1" color="text.secondary">
            Copy and paste, fill, import the wallet address and/or ens name
          </Typography>
        </Box>
        <Button component="label" variant="outlined" startIcon={<UploadFile />}>
          Import from a CSV
          <input
            hidden
            type="file"
            accept=".csv"
            onChange={(event) => {
              const reader = new FileReader();
              reader.onload = (e) => {
                const text = e.target?.result as string;
                onParseText(text);
              };
              if (event.target.files?.length) {
                reader.readAsText(event.target.files![0]);
              }
            }}
            value={[]}
          />
        </Button>
      </Stack>
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
            <Stack gap={1} direction="row" flexWrap="wrap">
              {wallets.map((wallet, index) => {
                const resolvedWallet = walletsQueries[index];
                const { isLoading, isError } = resolvedWallet;

                if (isLoading) {
                  return (
                    <Chip
                      key={wallet}
                      label={wallet}
                      deleteIcon={
                        <CircularProgress color="inherit" size={12} />
                      }
                      onDelete={() => {}}
                    />
                  );
                }

                return (
                  <Chip
                    key={wallet}
                    label={wallet}
                    color={isError ? 'error' : 'success'}
                    onClick={onEdit(wallet, index)}
                    onDelete={onDelete(index)}
                  />
                );
              })}
            </Stack>
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
    </Paper>
  );
}
