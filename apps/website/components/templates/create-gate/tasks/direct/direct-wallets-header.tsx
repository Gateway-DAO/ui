import { UseQueryResult } from '@tanstack/react-query';

import { UploadFile } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';

type Props = {
  readFiles: (files: File[] | FileList) => void;
  walletsQueries: UseQueryResult<string, unknown>[];
};
export function DirectWalletsHeader({ readFiles, walletsQueries }: Props) {
  const { validWallets, invalidWallets } = walletsQueries.reduce(
    (acc, query) => {
      if (query.isSuccess) {
        return {
          ...acc,
          validWallets: acc.validWallets + 1,
        };
      }
      if (query.isError) {
        return {
          ...acc,
          invalidWallets: acc.invalidWallets + 1,
        };
      }
      return acc;
    },
    { validWallets: 0, invalidWallets: 0 }
  );

  return (
    <Stack direction="column" gap={2}>
      <Stack
        direction={{
          xs: 'column',
          lg: 'row',
        }}
        alignItems={{
          xs: 'flex-start',
          lg: 'center',
        }}
        justifyContent="space-between"
        gap={2}
      >
        <Box>
          <Typography variant="h6">{validWallets} recipients</Typography>
          <Typography variant="body1" color="text.secondary">
            Copy and paste, fill, import the wallet address and/or ens name
          </Typography>
        </Box>
        <Button component="label" variant="outlined" startIcon={<UploadFile />}>
          Import from a CSV
          <input
            hidden
            type="file"
            accept=".csv"
            onChange={(event) => {
              if (event.target.files?.length) {
                readFiles(event.target.files);
              }
            }}
            value={[]}
          />
        </Button>
      </Stack>
      {invalidWallets ? (
        <Typography variant="body2" color="error">
          You have {invalidWallets} invalid wallets
        </Typography>
      ) : null}
    </Stack>
  );
}
