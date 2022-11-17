import { Virtuoso } from 'react-virtuoso';

import { Stack, Typography } from '@mui/material';

import { ProgressVerifyCSV } from './types';

export function DirectWalletsList({
  invalidList,
  validList,
}: Required<Pick<ProgressVerifyCSV, 'validList' | 'invalidList'>>) {
  return (
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
  );
}
