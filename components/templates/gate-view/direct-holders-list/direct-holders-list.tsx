import useTranslation from 'next-translate/useTranslation';
import { ChangeEvent, ReactNode, useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { GateFilledIcon } from 'apps/website/components/atoms/icon';
import { TOKENS } from 'apps/website/theme';
import { useWindowSize } from 'react-use';
import { Virtuoso } from 'react-virtuoso';
import { PartialDeep } from 'type-fest';

import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { query } from '../../../../constants/queries';
import { useAuth } from '../../../../providers/auth';
import { gqlAnonMethods } from '../../../../services/hasura/api';
import { Gates } from '../../../../services/hasura/types';
import { CenteredLoader } from '../../../atoms/centered-loader';
import { UserListItem } from '../../../molecules/user-list-item';
import { ClientNav } from '../../../organisms/navbar/client-nav';

type Props = {
  gate: PartialDeep<Gates>;
  header: ReactNode;
  isLoading: boolean;
  totalHolders: number;
};

export function DirectHoldersList({
  gate,
  header,
  isLoading: isLoadingInfo,
  totalHolders,
}: Props) {
  const { t } = useTranslation('credential');
  const [filter, setFilter] = useState('');
  const { me } = useAuth();
  const windowSize = useWindowSize();

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      [query.direct_credentialholders, me?.wallet, gate.id, filter],
      ({ pageParam = 0 }) =>
        filter?.length
          ? gqlAnonMethods.direct_credential_holders_search({
              gate_id: gate.id,
              offset: pageParam,
              search: `%${filter}%`,
            })
          : gqlAnonMethods.direct_credential_holders({
              offset: pageParam,
              gate_id: gate.id,
            }),
      {
        enabled: !isLoadingInfo,
        getNextPageParam: (lastPage, pages) => {
          if (lastPage.whitelisted_wallets.length < 15) return undefined;
          return pages.length * 15;
        },
      }
    );

  const whitelistedWallets =
    data?.pages?.flatMap((page) => page.whitelisted_wallets) ?? [];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  if (isLoadingInfo) {
    return (
      <Grid display="flex" flexDirection="column" item xs={12} md>
        <CenteredLoader />
      </Grid>
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
        {header}
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

      <Box
        sx={{
          height: { lg: '100%', xs: '100vh' },
          ...(!totalHolders && {
            display: 'flex',
            alignSelf: 'center',
          }),
        }}
      >
        {!totalHolders && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: 339,
              marginBottom: 20,
            }}
          >
            <Box
              sx={{
                height: 64,
                width: 64,
                padding: 3,
                borderRadius: '50%',
                background: '#9a53ff36',
              }}
            >
              <GateFilledIcon />
            </Box>

            <Typography variant="h6" textAlign={'center'} height={64} mt={2}>
              {t('direct-credential.eligibility.empty-whitelist')}
            </Typography>
          </Box>
        )}

        {isLoading ? (
          <CenteredLoader />
        ) : (
          <Virtuoso
            style={{ height: windowSize.height }}
            data={whitelistedWallets}
            endReached={() => hasNextPage && fetchNextPage()}
            components={{
              Footer: () => (isFetchingNextPage ? <CenteredLoader /> : null),
            }}
            itemContent={(index, whitelisted) => {
              const user = whitelisted.user?.[0]?.id
                ? whitelisted.user[0]
                : null;

              return (
                <>
                  <UserListItem
                    key={user?.id ?? whitelisted.wallet}
                    user={
                      user ?? {
                        name: `${whitelisted.wallet.slice(
                          0,
                          6
                        )}...${whitelisted.wallet.slice(
                          whitelisted.wallet.length - 4
                        )}`,
                        username: whitelisted.wallet,
                      }
                    }
                    showFollow={!!user && user.id !== me?.id}
                    hasLink={!!user}
                    hasUsernamePrefix={!!user}
                    sx={{
                      px: TOKENS.CONTAINER_PX,
                    }}
                  />
                  {index !== whitelistedWallets.length - 1 && <Divider />}
                </>
              );
            }}
          />
        )}
      </Box>
    </Grid>
  );
}
