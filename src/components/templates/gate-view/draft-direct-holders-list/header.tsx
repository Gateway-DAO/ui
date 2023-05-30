import useTranslation from 'next-translate/useTranslation';

import { Box, Typography } from '@mui/material';

type Props = {
  totalHolders: number;
};

export function DraftDirectHoldersHeader({ totalHolders }: Props) {
  const { t } = useTranslation('credential');

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6">
        {t('direct-credential.holders.draft-title', { count: totalHolders })}
      </Typography>
      <Typography variant="caption">
        {t('direct-credential.holders.draft-description')}
      </Typography>
    </Box>
  );
}
