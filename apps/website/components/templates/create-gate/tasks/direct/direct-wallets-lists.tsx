import {
  ChangeEvent,
  PropsWithChildren,
  ReactNode,
  useMemo,
  useState,
} from 'react';

import { Virtuoso } from 'react-virtuoso';

import { TOKENS } from '@gateway/theme';

import SearchIcon from '@mui/icons-material/Search';
import { Stack, Divider, InputAdornment, TextField, Chip } from '@mui/material';

import { UserListItem } from '../../../../molecules/user-list-item';
import { ProgressVerifyCSV, ValidatedWallet } from './types';

export function DirectWalletsList({
  invalidList,
  validList,
  searchContainer: SearchContainer,
}: Required<Pick<ProgressVerifyCSV, 'validList' | 'invalidList'>> & {
  searchContainer?: (props: PropsWithChildren<unknown>) => JSX.Element;
}) {
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
      ...(invalidList?.reduce((acc, wallet) => {
        const obj = { invalid: true, wallet };
        if (!filter.length) {
          return [...acc, obj];
        }
        return wallet.toLowerCase().includes(filter.toLowerCase())
          ? [...acc, obj]
          : acc;
      }, []) ?? []),
      ...(validList?.reduce((acc, string) => {
        const obj: ValidatedWallet = JSON.parse(string);
        if (!filter.length) {
          return [...acc, obj];
        }
        const { wallet, ens } = obj;
        return wallet.toLowerCase().includes(filter.toLowerCase()) ||
          ens?.toLowerCase().includes(filter.toLowerCase())
          ? [...acc, obj]
          : acc;
      }, []) ?? []),
    ];
    return wallets;
  }, [filter, invalidList, validList]);

  const searchInput = (
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
  );

  return (
    <Stack gap={3}>
      {SearchContainer ? (
        <SearchContainer>{searchInput}</SearchContainer>
      ) : (
        searchInput
      )}
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
                secondaryAction={
                  whitelisted.invalid ? (
                    <Chip variant="outlined" color="error" label="Invalid" />
                  ) : (
                    <Chip variant="outlined" color="success" label="Valid" />
                  )
                }
              />
              {index !== whitelistedWallets.length - 1 && <Divider />}
            </>
          );
        }}
      />
    </Stack>
  );
}
