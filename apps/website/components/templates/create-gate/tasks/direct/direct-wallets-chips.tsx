import { UseQueryResult } from '@tanstack/react-query';

import { Chip, CircularProgress, Stack } from '@mui/material';

import { Gate_Whitelisted_Wallet } from '../../schema';

type Props = {
  wallets: Gate_Whitelisted_Wallet[];
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
      {wallets.map(({ wallet, ens }, index) => {
        const resolvedWallet = walletsQueries[index];
        const { isFetching, isError } = resolvedWallet;

        if (isFetching) {
          return (
            <Chip
              key={ens ?? wallet}
              label={ens ?? wallet}
              avatar={<CircularProgress color="inherit" size={12} />}
              onDelete={onDelete(index)}
            />
          );
        }

        return (
          <Chip
            key={ens ?? wallet}
            label={ens ?? wallet}
            color={isError ? 'error' : 'success'}
            onClick={onEdit(ens ?? wallet, index)}
            onDelete={onDelete(index)}
          />
        );
      })}
    </Stack>
  );
}
