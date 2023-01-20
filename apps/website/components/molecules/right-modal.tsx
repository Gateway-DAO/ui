import * as React from 'react';

import { brandColors } from '@gateway/theme';

import CloseIcon from '@mui/icons-material/Close';
import { Stack, Typography, alpha } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

type Props = {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function ModalRight({
  children,
  open,
  title,
  handleClose,
}: Props) {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{
        width: { xs: '100%', md: '600px', lg: '720px' },
        left: 'auto',
        right: '0',
      }}
    >
      <Stack
        sx={{
          px: { xs: 3, md: 6 },
          py: { xs: 3, md: 6 },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 5 }}
        >
          <Typography variant="h5">{title}</Typography>
          <IconButton
            aria-label="close"
            sx={{ background: alpha(brandColors.white.main, 0.16) }}
            onClick={() => handleClose()}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
        {children}
      </Stack>
    </Dialog>
  );
}
