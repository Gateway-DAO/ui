import useTranslation from 'next-translate/useTranslation';

import { UploadFile } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';

type Props = {
  totalWallets?: number;
  disabled?: boolean;
  readFiles: (files: File[] | FileList) => void;
};
export function DirectWalletsHeader({
  disabled,
  readFiles,
  totalWallets = 0,
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
            {t('direct.title', { count: totalWallets })}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t('direct.description')}
          </Typography>
        </Box>
        <Button
          disabled={disabled}
          component="label"
          variant="outlined"
          startIcon={<UploadFile />}
        >
          {t('direct.import-csv')}
          <input
            hidden
            type="file"
            accept=".csv"
            disabled={disabled}
            onChange={(event) => {
              if (event.target.files?.length) {
                readFiles(event.target.files);
              }
            }}
            value={[]}
          />
        </Button>
      </Stack>
    </Stack>
  );
}
