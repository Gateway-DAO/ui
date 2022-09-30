import useTranslation from 'next-translate/useTranslation';

import { Box, Typography } from '@mui/material';

export function HoldersTitle({ total }: { total: number }) {
  const { t } = useTranslation('credential');
  return (
    <Box>
      <Typography variant="h6">
        {t('direct-credential.holders.title', { count: total })}
      </Typography>
      <Typography variant="caption">
        {t('direct-credential.holders.description')}
      </Typography>
    </Box>
  );
}
