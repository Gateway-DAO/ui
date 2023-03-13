import { ReactNode } from 'react';

import { theme } from '@gateway/theme';

import { useMediaQuery } from '@mui/material';

import SwipeableDrawerMobile from '../swipeable-drawer-mobile';
import {
  ModalContentProps,
  modalContentTypes,
  ModalContentView,
} from './ModalContentTypes';
import Modal from './modal';

type Props = {
  open?: boolean;
  handleClose?: () => void;
  handleOpen?: () => void;
  children?: ReactNode;
  modalType?: string;
  title?: string;
  imageUrl?: string;
  enableDownloadImage?: boolean;
  swipeableDrawer?: boolean;
};

export default function ModalBasic({
  open,
  handleClose,
  handleOpen,
  children,
  title,
  imageUrl,
  enableDownloadImage,
  swipeableDrawer = false,
  modalType = modalContentTypes.general,
}: Props) {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  const modalContentProps: ModalContentProps = {
    handleClose,
    children,
    swipeableDrawer,
    imageUrl,
    enableDownloadImage,
    modalType,
  };

  return (
    <>
      {isMobile && swipeableDrawer ? (
        <SwipeableDrawerMobile
          open={open}
          handleClose={() => handleClose()}
          handleOpen={() => handleOpen()}
        >
          <ModalContentView {...modalContentProps}>{children}</ModalContentView>
        </SwipeableDrawerMobile>
      ) : (
        <Modal
          open={open}
          handleClose={() => handleClose()}
          modalTitle={`Modal ${title}`}
          modalDescription={`Modal ${title}`}
        >
          <ModalContentView {...modalContentProps}>{children}</ModalContentView>
        </Modal>
      )}
    </>
  );
}
