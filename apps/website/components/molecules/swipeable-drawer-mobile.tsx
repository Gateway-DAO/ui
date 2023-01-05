import { ReactNode } from 'react';

import { brandColors } from '@gateway/theme';

import { Box, SwipeableDrawer } from '@mui/material';

type Props = {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  children: ReactNode;
};

export default function SwipeableDrawerMobile({
  open,
  handleClose,
  handleOpen,
  children,
}: Props) {
  return (
    <SwipeableDrawer
      open={open}
      onClose={() => handleClose()}
      onOpen={() => handleOpen()}
      anchor="bottom"
      swipeAreaWidth={56}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Box
        sx={{
          width: 30,
          height: 6,
          backgroundColor: brandColors.grays.dark,
          borderRadius: 3,
          mt: 2,
          mx: 'auto',
        }}
      ></Box>
      <Box sx={{ p: 2, maxWidth: '100%' }}>{children}</Box>
    </SwipeableDrawer>
  );
}
