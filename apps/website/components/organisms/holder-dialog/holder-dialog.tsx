import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';

import useTranslation from 'next-translate/useTranslation';
import { Dispatch, Fragment, SetStateAction, useMemo, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent } from 'react';

import { useAuth } from 'apps/website/providers/auth';

import { useInfiniteQuery } from '@tanstack/react-query';

import { Virtuoso } from 'react-virtuoso';
import { CenteredLoader } from '../../atoms/centered-loader';
import { UserList } from 'apps/website/components/atoms/users-list';

export type PropsTypes = {
  isHolderDialog: boolean;
  setIsHolderDialog: Dispatch<SetStateAction<boolean>>;
  credentialId: String;
};

export function HolderDialog(Props: PropsTypes) {
  const { isHolderDialog, setIsHolderDialog, credentialId } = Props;
  const { gqlAuthMethods } = useAuth();

  const [filter, setFilter] = useState('');
  const { t } = useTranslation('credential');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const {
    data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    isFetching,
  } = useInfiniteQuery(
    ['holders_by_gate', credentialId],
    ({ pageParam = 0 }) =>
      filter?.length
        ? gqlAuthMethods.holders_by_search({
            id: credentialId,
            search: `%${filter}%`,
            offset: pageParam,
          })
        : gqlAuthMethods.holders_by_gate({
            id: credentialId,
            offset: pageParam,
          }),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.gates_by_pk?.holders?.length < 6) return undefined;
        return pages.length * 6;
      },
    }
  );

  const holders = data?.pages.flatMap((page) => page.gates_by_pk.holders);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      refetch();
    }
  };

  return (
    <Dialog open={isHolderDialog} keepMounted={false} fullWidth>
      <DialogTitle> Holders </DialogTitle>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        sx={{ mx: 2, mt: 1, mb: 4 }}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={filter}
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
                onClick={() => refetch()}
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

      {isFetching ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Virtuoso
          style={{ height: holders.length > 4 ? '40vh' : '22vh' }}
          data={holders}
          endReached={() => hasNextPage && fetchNextPage()}
          components={{
            Footer: () => (isFetchingNextPage ? <CenteredLoader /> : null),
          }}
          itemContent={(index, holder) => (
            <>
              <UserList {...{ user: holder, index }} />
              {index !== holders?.length - 1 && <Divider />}
            </>
          )}
        />
      )}

      {!holders?.length && filter.length > 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mx: 3 }}>
          No users with "{filter}" were found
        </Typography>
      )}

      <DialogActions sx={{ pt: 2 }}>
        <Button
          onClick={() => setIsHolderDialog(false)}
          variant="contained"
          fullWidth
        >
          close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
