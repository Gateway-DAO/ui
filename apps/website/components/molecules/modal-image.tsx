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

  const renderImage = (image: string, alt: string) => {
    return <img src={image} alt={alt} width="100%" />;
  };

  return (
    <>
      {isMobile && swipeableDrawer ? (
        <SwipeableDrawerMobile
          open={open}
          handleClose={() => handleClose()}
          handleOpen={() => handleOpen()}
        >
          {renderImage(image, alt)}
        </SwipeableDrawerMobile>
      ) : (
        <Modal
          open={open}
          handleClose={() => handleClose()}
          modalTitle={`Modal ${alt}`}
          modalDescription={`Modal ${alt}`}
        >
          <>
            <Box
              sx={{
                textAlign: 'center',
                maxWidth: '396px',
                margin: 'auto',
                mb: 3,
                borderRadius: 1,
                overflow: 'hidden',
                display: 'flex',
              }}
            >
              {renderImage(image, alt)}
            </Box>
            <Stack gap={1}>
              {downloadButtonText && (
                <Button
                  variant="contained"
                  href={image}
                  target="_blank"
                  download
                >
                  {downloadButtonText}
                </Button>
              )}
              <Button variant="outlined" onClick={() => handleClose()}>
                {t('common:actions.close')}
              </Button>
            </Stack>
          </>
        </Modal>
      )}
    </>
  );
}
