import useTranslation from 'next-translate/useTranslation';

import { Box, Button, Stack, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { AddRecipientDirectCredentialSchema } from './direct-wallets';
import { Download, PlusOne, Add } from '@mui/icons-material';

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
        <Button variant="outlined" href="/example.csv" download={'example'}>
          <Download color="primary" /> Download CSV template
        </Button>
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
  total: number;
  readFiles?: (files: File[] | FileList) => void;
  setAddRecipient: (nextValue?: any) => void;
  skipAddRecipient?: boolean;
};

export function DirectWalletsHeader({
  validWallets = 0,
  invalidWallets = 0,
  total = 0,
  readFiles,
  setAddRecipient,
  skipAddRecipient,
}: Props) {
  const { t } = useTranslation('gate-new');
  const { setValue } = useFormContext<AddRecipientDirectCredentialSchema>();
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
          <Typography variant="h6">{total} recipients</Typography>
          <Typography variant="body2">
            {t('direct.result.title.valid', { count: validWallets })}
            {` / `}
            {t('direct.result.title.invalid', { count: invalidWallets })}
          </Typography>
        </Box>

        {!skipAddRecipient && (
          <Button
            variant="outlined"
            onClick={() => {
              setValue('addNew', true);
              setValue('oldType', '');
              setValue('oldWallet', '');
              setValue('type', '');
              setValue('wallet', '');
              setAddRecipient();
            }}
          >
            <Add color="primary" />
            {t('direct.result.add')}
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
