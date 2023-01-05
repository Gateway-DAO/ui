import useTranslation from 'next-translate/useTranslation';

import { theme } from '@gateway/theme';

import { Stack, Button, Box, useMediaQuery } from '@mui/material';

import Modal from './modal';
import SwipeableDrawerMobile from './swipeable-drawer-mobile';

type Props = {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  image: string;
  alt: string;
  downloadButtonText?: string;
  swipeableDrawer?: boolean;
};

export default function ModalImage({
  open,
  handleClose,
  handleOpen,
  image,
  alt,
  downloadButtonText,
  swipeableDrawer = false,
}: Props) {
  const { t } = useTranslation('protocol');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  const modalContent = (image: string, alt: string) => {
    return (
      <Box sx={{ maxWidth: '396px', margin: 'auto' }}>
        <Box
          sx={{
            textAlign: 'center',
            mb: 3,
            borderRadius: 1,
            overflow: 'hidden',
            display: 'flex',
          }}
        >
          <img src={image} alt={alt} width="100%" />
        </Box>
        <Stack gap={1}>
          {downloadButtonText && (
            <Button variant="contained" href={image} target="_blank" download>
              {downloadButtonText}
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
          {modalContent(image, alt)}
        </SwipeableDrawerMobile>
      ) : (
        <Modal
          open={open}
          handleClose={() => handleClose()}
          modalTitle={`Modal ${alt}`}
          modalDescription={`Modal ${alt}`}
        >
          {modalContent(image, alt)}
        </Modal>
      )}
    </>
  );
}
