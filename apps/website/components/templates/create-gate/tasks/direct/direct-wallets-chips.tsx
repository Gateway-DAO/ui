import { UseQueryResult } from '@tanstack/react-query';

import { Chip, CircularProgress, Stack } from '@mui/material';

type Props = {
  wallets: string[];
  walletsQueries: UseQueryResult<string, unknown>[];
  onDelete: (index: number) => () => void;
  onEdit: (wallet: string, index: number) => () => void;
};
export function DirectWalletsChips({
  onDelete,
  onEdit,
  wallets,
  walletsQueries,
}: Props) {
  return (
    <Stack gap={1} direction="row" flexWrap="wrap">
      {wallets.map((wallet, index) => {
        const resolvedWallet = walletsQueries[index];
        const { isLoading, isError } = resolvedWallet;

        if (isLoading) {
          return (
            <Chip
              key={wallet}
              label={wallet}
              avatar={<CircularProgress color="inherit" size={12} />}
              onDelete={onDelete(index)}
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
  );
}
