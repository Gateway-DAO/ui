import { Dispatch, Fragment, SetStateAction, useState } from 'react';
import { ChangeEvent } from 'react';

import { CenteredLoader } from '@/components/atoms/loadings/centered-loader';
import { UserListItem } from '@/components/molecules/user-list-item';
import { useAuth } from '@/providers/auth';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Virtuoso } from 'react-virtuoso';

import SearchIcon from '@mui/icons-material/Search';
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

export type Props = {
  isHolderDialog: boolean;
  setIsHolderDialog: Dispatch<SetStateAction<boolean>>;
  credentialId: string;
};

export function HolderDialog({
  isHolderDialog,
  setIsHolderDialog,
  credentialId,
}: Props) {
  const { hasuraUserService } = useAuth();

  const [filter, setFilter] = useState('');
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
  } = useInfiniteQuery(
    ['holders_by_gate', credentialId],
    ({ pageParam = 0 }) =>
      filter?.length
        ? hasuraUserService.holders_by_search({
            id: credentialId,
            search: `%${filter}%`,
            offset: pageParam,
          })
        : hasuraUserService.holders_by_gate({
            id: credentialId,
            offset: pageParam,
          }),
    {
      enabled: !!credentialId,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.gates_by_pk?.holders?.length < 6) return undefined;
        return pages.length * 6;
      },
    }
  );

  const holders = data?.pages.flatMap((page) => page.gates_by_pk?.holders);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      refetch();
    }
  };

  const handleClose = () => {
    setIsHolderDialog(false);
  };

  return (
    <Dialog
      open={isHolderDialog}
      onClose={handleClose}
      keepMounted={false}
      fullWidth
    >
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

      {isLoading ? (
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
          style={{ height: holders.length > 4 ? '40vh' : '26vh' }}
          data={holders}
          endReached={() => hasNextPage && fetchNextPage()}
          components={{
            Footer: () => (isFetchingNextPage ? <CenteredLoader /> : null),
          }}
          itemContent={(index, holder) => (
            <Fragment key={index}>
              <UserListItem user={holder} />
              {index !== holders?.length - 1 && <Divider />}
            </Fragment>
          )}
        />
      )}

      {!holders?.length && filter.length > 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mx: 3 }}>
          No users with &quot;{filter}&quot; were found
        </Typography>
      )}

      <DialogActions sx={{ pt: 2 }}>
        <Button onClick={handleClose} variant="contained" fullWidth>
          close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
