import useTranslation from 'next-translate/useTranslation';

import { theme } from '@gateway/theme';

import { Stack, Button, Box, useMediaQuery } from '@mui/material';

import { ModalContentProps } from './ModalContentTypes';

export default function GeneralData({
  handleClose,
  children,
  swipeableDrawer = false,
}: ModalContentProps) {
  const { t } = useTranslation('protocol');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  return (
    <Box sx={{ width: { xs: '250px', md: '396px' }, margin: 'auto' }}>
      <Box
        sx={{
          textAlign: 'center',
          mb: 3,
          borderRadius: 1,
          overflow: 'hidden',
          display: 'flex',
        }}
      >
        {children}
      </Box>
      <Stack gap={1}>
        {((swipeableDrawer && !isMobile) || !swipeableDrawer) && (
          <Button variant="outlined" onClick={() => handleClose()}>
            {t('common:actions.close')}
          </Button>
        )}
      </Stack>
    </Box>
  );
}
