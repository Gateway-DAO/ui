import { useRef, useState } from 'react';

import { useSnackbar } from 'notistack';

import { UploadFile } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

export function DirectWallets() {
  const [wallets, setWallets] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const inputRef = useRef<HTMLInputElement>(null);

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
  return (
    <Paper
      elevation={1}
      sx={{ p: { md: 6 }, display: 'flex', flexFlow: 'column', gap: 4 }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
      >
        <Box>
          <Typography variant="h6">0 recipients</Typography>
          <Typography variant="body1" color="text.secondary">
            Copy and paste, fill, import the wallet address and/or ens name
          </Typography>
        </Box>
        <Button variant="outlined" startIcon={<UploadFile />}>
          Import from a CSV
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
              {wallets.map((wallet, index) => (
                <Chip
                  key={wallet}
                  label={wallet}
                  onClick={onEdit(wallet, index)}
                  onDelete={onDelete(index)}
                />
              ))}
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
              if (!wallets.includes(inputValue)) {
                setWallets((prev) => [...prev, inputValue]);
              } else {
                enqueueSnackbar('Wallet already added', { variant: 'error' });
              }
              setInputValue('');
            }
          }
        }}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onPaste={(e) => {
          const pasted = e.clipboardData.getData('text');
          const newWallets = pasted
            .split(/[,\n\s]/g)
            .map((w) => w.trim())
            .filter((w) => w.length && !wallets.includes(w));
          setWallets((prev) => [...prev, ...newWallets]);
          e.preventDefault();
        }}
      />
    </Paper>
  );
}
