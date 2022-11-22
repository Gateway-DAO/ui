import { ChangeEvent, useMemo, useState } from 'react';

import { Virtuoso } from 'react-virtuoso';

import { TOKENS } from '@gateway/theme';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Stack, Divider, InputAdornment, TextField } from '@mui/material';

import { UserListItem } from '../../../../molecules/user-list-item';
import { ProgressVerifyCSV, ValidatedWallet } from './types';

export function DirectWalletsList({
  invalidList,
  validList,
}: Required<Pick<ProgressVerifyCSV, 'validList' | 'invalidList'>>) {
  const [filter, setFilter] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const whitelistedWallets = useMemo(() => {
    const wallets: {
      wallet: string;
      ens?: string;
      invalid?: boolean;
    }[] = [
      ...(validList?.map((string) => JSON.parse(string) as ValidatedWallet) ??
        []),
      ...(invalidList?.map((wallet) => ({ invalid: true, wallet })) ?? []),
    ];
    if (filter.length > 0) {
      return wallets.filter(({ wallet, ens }) => {
        if (ens) {
          return wallet.includes(filter) || ens.includes(filter);
        }
        return wallet.includes(filter);
      });
    }
    return wallets;
  }, [filter, invalidList, validList]);

  return (
    <Stack gap={3}>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        onChange={handleChange}
        value={filter}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              sx={{
                paddingRight: 1,
              }}
            >
              <SearchIcon
                sx={{
                  color: 'rgba(255, 255, 255, 0.56)',
                }}
              />
            </InputAdornment>
          ),
          fullWidth: true,
          sx: {
            borderRadius: 100,
          },
          size: 'small',
        }}
      />
      <Virtuoso
        style={{ height: Math.min(400, whitelistedWallets.length * 61) }}
        data={whitelistedWallets}
        itemContent={(index, whitelisted) => {
          return (
            <>
              <UserListItem
                user={{
                  name: whitelisted.ens
                    ? whitelisted.ens
                    : `${whitelisted.wallet.slice(
                        0,
                        6
                      )}...${whitelisted.wallet.slice(
                        whitelisted.wallet.length - 4
                      )}`,
                  username: whitelisted.wallet,
                }}
                showFollow={false}
                hasLink={false}
                hasUsernamePrefix={false}
                sx={{
                  px: TOKENS.CONTAINER_PX,
                  color: whitelisted.invalid && 'red !important',
                }}
                icon={whitelisted.invalid ? <CloseIcon /> : <CheckIcon />}
              />
              {index !== whitelistedWallets.length - 1 && <Divider />}
            </>
          );
        }}
      />
    </Stack>
  );

  /*   return (
    <Stack gap={3}>
      {!!validList.length && (
        <Stack gap={2}>
          <Typography fontWeight="bold">Valid</Typography>
          <Virtuoso
            style={{ height: Math.min(400, validList.length * 24) }}
            data={validList}
            itemContent={(index, validated) => {
              const { ens, wallet } = JSON.parse(validated);
              return <Typography>{ens ?? wallet}</Typography>;
            }}
          />
        </Stack>
      )}
      {!!invalidList.length && (
        <Stack gap={2}>
          <Typography fontWeight="bold">Invalid</Typography>
          <Virtuoso
            style={{ height: Math.min(400, invalidList.length * 24) }}
            data={invalidList}
            itemContent={(index, wallet) => <Typography>{wallet}</Typography>}
          />
        </Stack>
      )}
    </Stack>
  ); */
}
