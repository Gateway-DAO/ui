import useTranslation from 'next-translate/useTranslation';

import { UploadFile } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';

export function DirectWalletsEmptyHeader() {
  const { t } = useTranslation('gate-new');

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
          <Typography variant="h6">{t('direct.empty.title')}</Typography>
          <Typography variant="body1" color="text.secondary">
            {t('direct.empty.description')}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
}
export function DirectWalletsVerifyingHeader({ total }: { total: number }) {
  const { t } = useTranslation('gate-new');

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
            {t('direct.verifying.title', { count: total })}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
}

type Props = {
  validWallets?: number;
  invalidWallets?: number;
  readFiles?: (files: File[] | FileList) => void;
};

export function DirectWalletsHeader({
  validWallets = 0,
  invalidWallets = 0,
  readFiles,
}: Props) {
  const { t } = useTranslation('gate-new');

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
            {t('direct.result.title.valid', { count: validWallets })}
            {invalidWallets > 0 &&
              ` / ${t('direct.result.title.invalid', {
                count: invalidWallets,
              })}`}
          </Typography>
        </Box>
        {readFiles && (
          <Button
            component="label"
            variant="outlined"
            startIcon={<UploadFile />}
          >
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
        )}
      </Stack>
    </Stack>
  );
}
