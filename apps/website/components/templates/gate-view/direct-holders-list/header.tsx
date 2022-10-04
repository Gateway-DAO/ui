import useTranslation from 'next-translate/useTranslation';

import { useQuery } from '@tanstack/react-query';
import { gqlAnonMethods } from 'apps/website/services/api';

import { Alert, Box, Button, Stack, Typography } from '@mui/material';

import { useAuth } from '../../../../providers/auth';

type Props = {
  gateId: string;
};

export function DirectHoldersHeader({ gateId }: Props) {
  const { me, onOpenLogin } = useAuth();
  const { t } = useTranslation('credential');

  const { data } = useQuery(
    ['direct-credential-info', me?.wallet, gateId],
    () =>
      gqlAnonMethods.direct_credential_info({
        gate_id: gateId,
        wallet: me?.wallet ?? '',
      })
  );

  const hasCredential = data?.hasCredential?.aggregate?.count > 0;
  const totalHolders = data?.whitelisted_wallets_aggregate.aggregate.count;

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">
          {t('direct-credential.holders.title', { count: totalHolders })}
        </Typography>
        <Typography variant="caption">
          {t('direct-credential.holders.description')}
        </Typography>
      </Box>
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
          {t('direct-credential.eligibility.has')}
        </Alert>
      )}
      {!!me && !hasCredential && (
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
