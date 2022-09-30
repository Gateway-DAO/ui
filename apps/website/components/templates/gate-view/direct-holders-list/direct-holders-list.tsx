import useTranslation from 'next-translate/useTranslation';
import { ChangeEvent, useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';

import SearchIcon from '@mui/icons-material/Search';
import { Alert, InputAdornment, List, TextField } from '@mui/material';

import { useWindowVirtualInfiniteScroll } from '../../../../hooks/use-virtual-infinite-scroll';
import { useAuth } from '../../../../providers/auth';
import { gqlAnonMethods } from '../../../../services/api';
import { Gates } from '../../../../services/graphql/types.generated';
import { CenteredLoader } from '../../../atoms/centered-loader';
import { UserListItem } from '../../../molecules/user-list-item';
import { ClientNav } from '../../../organisms/navbar/client-nav';
import { CheckEligibilityBanner } from './check-eligibility-banner';
import { HoldersTitle } from './holders-title';

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
          : */ gqlAnonMethods.credential_holders({
          offset: pageParam,
          gate_id: gate.id,
          wallet: me?.wallet ?? '',
        }),
      {
        getNextPageParam: (lastPage, pages) => {
          if (lastPage.whitelisted_wallets.length < 15) return undefined;
          return pages.length * 15;
        },
      }
    );

  const hasCredential =
    data?.pages[data.pages.length - 1]?.hasCredential?.aggregate?.count > 0;

  const totalHolders =
    data?.pages[data.pages.length - 1].whitelisted_wallets_aggregate.aggregate
      .count;

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

  return isLoading ? (
    <CenteredLoader />
  ) : (
    <>
      <ClientNav />
      <HoldersTitle total={totalHolders}></HoldersTitle>
      {!me && <CheckEligibilityBanner />}
      {!!me && hasCredential && (
        <Alert variant="outlined" severity="success" icon={<></>}>
          {t('direct-credential.eligibility.has', { published: '22/09/2022' })}
        </Alert>
      )}
      {!!me && !hasCredential && (
        <Alert variant="outlined" severity="warning" icon={<></>}>
          {t('direct-credential.eligibility.not')}
        </Alert>
      )}
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

      <List
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
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
          );
        })}
      </List>
    </>
  );
}
