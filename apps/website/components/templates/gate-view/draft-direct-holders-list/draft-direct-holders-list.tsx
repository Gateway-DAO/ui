import { ChangeEvent, useMemo, useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Virtuoso } from 'react-virtuoso';
import { PartialDeep } from 'type-fest';

import { TOKENS } from '@gateway/theme';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';

import { useAuth } from '../../../../providers/auth';
import { gqlUserHeader } from '../../../../services/api';
import { Gates } from '../../../../services/graphql/types.generated';
import { UserListItem } from '../../../molecules/user-list-item';
import { ClientNav } from '../../../organisms/navbar/client-nav';
import { DirectWalletsProgress } from '../../create-gate/tasks/direct/direct-wallets-progress';
import {
  ProgressVerifyCSV,
  ValidatedWallet,
} from '../../create-gate/tasks/direct/types';
import { DraftDirectHoldersHeader } from './header';

type Props = {
  gate: PartialDeep<Gates>;
};

export function DraftDirectHoldersList({ gate }: Props) {
  const [filter, setFilter] = useState('');
  const { me, token } = useAuth();

  const file = gate.whitelisted_wallets_file;

  const progressReq = useInfiniteQuery(
    ['progress', file?.id],
    async (): Promise<ProgressVerifyCSV> => {
      const res = await fetch(
        `http://localhost:8080/test/progress?id=${file?.id}`,
        {
          method: 'GET',
          headers: gqlUserHeader(token, me?.id),
        }
      );
      return res.json();
    },
    {
      enabled: !!file?.id,
      keepPreviousData: false,
      refetchInterval: (data) => !data?.pages[0].isDone && 1000,
      onSuccess(data) {
        if (data.pages[0].isDone) {
          // onFinish();
        }
      },
    }
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const progress = progressReq.data?.pages[0];
  const whitelistedWallets = useMemo(() => {
    const wallets: {
      wallet: string;
      ens?: string;
      invalid?: boolean;
    }[] = [
      ...(progress?.validList?.map(
        (string) => JSON.parse(string) as ValidatedWallet
      ) ?? []),
      ...(progress?.invalidList?.map((wallet) => ({ invalid: true, wallet })) ??
        []),
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
  }, [filter, progress?.invalidList, progress?.validList]);

  if (progressReq.isLoading) {
    return <CircularProgress />;
  }

  if (!progress.isDone) {
    return (
      <Stack
        sx={{
          px: TOKENS.CONTAINER_PX,
        }}
      >
        <DirectWalletsProgress total={file?.metadata?.total} {...progress} />
      </Stack>
    );
  }

  return (
    <Grid display="flex" flexDirection="column" item xs={12} md>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        sx={{
          height: (theme) => theme.spacing(7),
          px: TOKENS.CONTAINER_PX,
          display: {
            xs: 'none',
            md: 'flex',
          },
        }}
      >
        <ClientNav />
      </Stack>

      <Box
        sx={{
          px: {
            ...TOKENS.CONTAINER_PX,
            lg: 7.5,
          },
          pb: 2,
        }}
      >
        <DraftDirectHoldersHeader totalHolders={progress.valid} />
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
      </Box>

      <Box sx={{ height: { lg: '100%', xs: '100vh' } }}>
        <Virtuoso
          style={{ height: '100%' }}
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
      </Box>
    </Grid>
  );
}
