import useTranslation from 'next-translate/useTranslation';

import CopyPaste from '@/components/molecules/copy-paste';
import { limitCharsCentered } from '@/utils/string';

import { Chip, Paper, Stack, Typography } from '@mui/material';

type Props = {
  id: string;
  username: string;
  status: 'valid' | 'invalid';
};

export function CredentialIdentityCard({ id, username, status }: Props) {
  const { t } = useTranslation('settings');
  return (
    <Stack
      component={Paper}
      direction={'row'}
      padding={2}
      sx={{
        bgcolor: 'background.light',
        border: 1,
        borderColor: '#E5E5E51F',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <Stack direction="row" alignItems="center" gap={1}>
          ID{' '}
          <CopyPaste
            text={limitCharsCentered(id, 6)}
            sucessMessage={t('account-management.copy-id')}
          />
        </Stack>
        <Typography variant="h6">@{username}</Typography>
      </div>
      <Chip
        label={status}
        size="small"
        color={status === 'valid' ? 'success' : 'error'}
        variant="outlined"
        sx={{
          alignSelf: 'center',
        }}
      />
    </Stack>
  );
}
