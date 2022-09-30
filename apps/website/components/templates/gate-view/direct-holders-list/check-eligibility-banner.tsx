import useTranslation from 'next-translate/useTranslation';

import { Box, Button, Stack, Typography } from '@mui/material';

import { useAuth } from '../../../../providers/auth';

export function CheckEligibilityBanner() {
  const { onOpenLogin } = useAuth();
  const { t } = useTranslation('credential');
  return (
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
  );
}
