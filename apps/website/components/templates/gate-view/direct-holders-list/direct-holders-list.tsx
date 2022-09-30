import useTranslation from 'next-translate/useTranslation';
import { ChangeEvent, useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';

import { TOKENS } from '@gateway/theme';

import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Divider,
  InputAdornment,
  List,
  Stack,
  TextField,
} from '@mui/material';

import { useWindowVirtualInfiniteScroll } from '../../../../hooks/use-virtual-infinite-scroll';
import { useAuth } from '../../../../providers/auth';
import { gqlAnonMethods } from '../../../../services/api';
import { Gates } from '../../../../services/graphql/types.generated';
import { CenteredLoader } from '../../../atoms/centered-loader';
import { UserListItem } from '../../../molecules/user-list-item';
import { ClientNav } from '../../../organisms/navbar/client-nav';
import { DirectHoldersHeader } from './header';

type Props = {
  gate: PartialDeep<Gates>;
};

export function DirectHoldersList({ gate }: Props) {
  const [filter, setFilter] = useState('');
  const { t } = useTranslation('credential');
  const { me } = useAuth();

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      ['direct-credential-holders', me?.wallet, gate.id, filter],
      ({ pageParam = 0 }) =>
        /* filter?.length
          ? gqlAnonMethods.credential_holders_search({
              offset: pageParam,
              search: `%${filter}%`,
            })
          : */ gqlAnonMethods.direct_credential_holders({
          offset: pageParam,
          gate_id: gate.id,
        }),
      {
        getNextPageParam: (lastPage, pages) => {
          if (lastPage.whitelisted_wallets.length < 15) return undefined;
          return pages.length * 15;
        },
      }
    );

  const whitelistedWallets =
    data?.pages?.flatMap((page) => page.whitelisted_wallets) ?? [];

  const { items, rowVirtualizer } = useWindowVirtualInfiniteScroll({
    data: whitelistedWallets,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    itemHeight: () => 77,
    overscan: 5,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        sx={{
          height: (theme) => theme.spacing(7),
          px: TOKENS.CONTAINER_PX,
          flexGrow: {
            md: 0.5,
          },
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
        }}
      >
        <DirectHoldersHeader gateId={gate.id} />
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
          sx={{
            mb: 4,
          }}
        />
        {isLoading ? (
          <CenteredLoader />
        ) : (
          <List
            sx={{
              width: '100%',
              position: 'relative',
            }}
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
            }}
          >
            {items.map((row) => {
              const { size, start, index } = row;
              const isLoaderRow = index > whitelistedWallets.length - 1;
              const walletUser = whitelistedWallets[index];
              if (!hasNextPage && isLoaderRow) return null;
              if (isLoaderRow) {
                return (
                  <CenteredLoader
                    key={row.index}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${size}px`,
                      transform: `translateY(${start}px)`,
                    }}
                  />
                );
              }
              return (
                <>
                  <UserListItem
                    key={walletUser?.user?.id ?? walletUser.wallet}
                    user={
                      walletUser?.user ?? {
                        name: 'Unknown User',
                        username: walletUser.wallet,
                      }
                    }
                    showFollow={!!walletUser?.user}
                    hasLink={!!walletUser?.user}
                    hasUsernamePrefix={!!walletUser?.user}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${size}px`,
                      transform: `translateY(${start}px)`,
                    }}
                  />
                  {index !== whitelistedWallets.length - 1 && (
                    <Divider
                      sx={(theme) => ({
                        position: 'absolute',
                        left: {
                          xs: theme.spacing(-TOKENS.CONTAINER_PX.xs),
                          md: theme.spacing(-TOKENS.CONTAINER_PX.md),
                          lg: theme.spacing(-7.5),
                        },
                        top: 0,
                        right: 0,
                        width: {
                          xs: `calc(100% + ${theme.spacing(
                            TOKENS.CONTAINER_PX.xs * 2
                          )} ) `,
                          md: `calc(100% + ${theme.spacing(
                            TOKENS.CONTAINER_PX.md * 2
                          )} ) `,
                          lg: `calc(100% + ${theme.spacing(15)} ) `,
                        },
                      })}
                      style={{
                        transform: `translateY(${start + size}px)`,
                      }}
                    />
                  )}
                </>
              );
            })}
          </List>
        )}
      </Box>
    </>
  );
}
