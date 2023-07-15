import useTranslation from 'next-translate/useTranslation';

import { useAuth } from '@/providers/auth';
import { DateTime } from 'luxon';

import { Alert, Box, Button, Stack, Typography } from '@mui/material';
import { Send } from '@mui/icons-material';

type Props = {
  isLoading?: boolean;
  hasCredential: boolean;
  totalHolders: number;
  completedAt?: string;
};

export function DirectHoldersHeader({
  hasCredential,
  totalHolders,
  completedAt,
}: Props) {
  const { me, onOpenLogin } = useAuth();
  const { t } = useTranslation('credential');

  return (
    <>
      <Stack direction="row" justifyContent={'space-between'}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">
            {t('direct-credential.holders.title', { count: totalHolders })}
          </Typography>
          <Typography variant="caption">
            {t('direct-credential.holders.description')}
          </Typography>
        </Box>
        <Button variant="contained" disabled={true} sx={{ m: 2 }}>
          <Send sx={{ mr: 1.2 }} /> Send More
        </Button>
      </Stack>
      {!me && (
        <Stack
          direction="row"
          py={2}
          px={4}
          spacing={4}
          alignItems="center"
          justifyContent="space-between"
          borderRadius={1}
          sx={{
            backgroundColor: 'rgba(229, 229, 229, 0.08)',
            mb: 3.75,
          }}
        >
          <Box>
            <Typography variant="subtitle1" color="text.primary">
              {t('direct-credential.eligibility.check.title')}
            </Typography>
            <Typography variant="caption">
              {t('direct-credential.eligibility.check.description')}
            </Typography>
          </Box>
          <Button variant="contained" onClick={onOpenLogin}>
            {t('common:actions.check')}
          </Button>
        </Stack>
      )}
      {!!me && hasCredential && (
        <Alert
          variant="outlined"
          severity="success"
          icon={<></>}
          sx={{ mb: 3.75 }}
        >
          {completedAt
            ? t('direct-credential.eligibility.has-at', {
                published: DateTime.fromISO(completedAt).toFormat(`MM/dd/yyyy`),
              })
            : t('direct-credential.eligibility.has')}
        </Alert>
      )}
      {!!me && !hasCredential && !!totalHolders && (
        <Alert
          variant="outlined"
          severity="warning"
          icon={<></>}
          sx={{ mb: 3.75 }}
        >
          {t('direct-credential.eligibility.not')}
        </Alert>
      )}
    </>
  );
}
