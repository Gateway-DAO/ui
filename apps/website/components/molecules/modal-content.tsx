import useTranslation from 'next-translate/useTranslation';
import { ReactNode } from 'react';

import { theme } from '@gateway/theme';

import { Stack, Button, Box, useMediaQuery } from '@mui/material';

import Modal from './modal';
import SwipeableDrawerMobile from './swipeable-drawer-mobile';

type Props = {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  children: ReactNode;
  title?: string;
  imageUrl?: string;
  swipeableDrawer?: boolean;
};

export default function ModalContent({
  open,
  handleClose,
  handleOpen,
  children,
  title,
  imageUrl,
  swipeableDrawer = false,
}: Props) {
  const { t } = useTranslation('protocol');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  const modalContent = () => {
    return (
      <Box sx={{ maxWidth: '396px', minWidth: '250px', margin: 'auto' }}>
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
          {imageUrl && (
            <Button
              variant="contained"
              href={imageUrl}
              target="_blank"
              download
            >
              {t('common:actions.download')}
            </Button>
          )}
          {((swipeableDrawer && !isMobile) || !swipeableDrawer) && (
            <Button variant="outlined" onClick={() => handleClose()}>
              {t('common:actions.close')}
            </Button>
          )}
        </Stack>
      </Box>
    );
  };

  return (
    <>
      {isMobile && swipeableDrawer ? (
        <SwipeableDrawerMobile
          open={open}
          handleClose={() => handleClose()}
          handleOpen={() => handleOpen()}
        >
          {modalContent()}
        </SwipeableDrawerMobile>
      ) : (
        <Modal
          open={open}
          handleClose={() => handleClose()}
          modalTitle={`Modal ${title}`}
          modalDescription={`Modal ${title}`}
        >
          {modalContent()}
        </Modal>
      )}
    </>
  );
}
