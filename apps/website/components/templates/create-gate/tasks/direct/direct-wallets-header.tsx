import useTranslation from 'next-translate/useTranslation';

import { UseQueryResult } from '@tanstack/react-query';

import { UploadFile } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';

type Props = {
  readFiles: (files: File[] | FileList) => void;
  walletsQueries: UseQueryResult<string, unknown>[];
};
export function DirectWalletsHeader({ readFiles, walletsQueries }: Props) {
  const { t } = useTranslation('gate-new');
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
          <Typography variant="h6">
            {t('direct.title', { count: validWallets })}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t('direct.description')}
          </Typography>
        </Box>
        <Button component="label" variant="outlined" startIcon={<UploadFile />}>
          {t('direct.import-csv')}
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
          {t('direct.invalid', { count: invalidWallets })}
        </Typography>
      ) : null}
    </Stack>
  );
}
