import * as React from 'react';

import { brandColors } from '@gateway/theme';

import CloseIcon from '@mui/icons-material/Close';
import {
  Stack,
  Typography,
  alpha,
  Paper,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import Dialog, { DialogProps } from '@mui/material/Dialog';
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
  title?: string;
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
      scroll="paper"
      sx={{
        width: { xs: '100%', md: '600px', lg: '720px' },
        left: 'auto',
        right: '0',
        '& > div > .MuiPaper-elevation': {
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.12) 100%), #10041C',
        },
      }}
    >
      <DialogTitle
        sx={{
          pt: { xs: 3, md: 6 },
          pb: { xs: 2, md: 3 },
          px: { xs: 3, md: 6 },
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: title ? 'space-between' : 'flex-end',
        }}
        id="scroll-dialog-title"
      >
        {title && <Typography variant="h5">{title}</Typography>}
        <IconButton
          aria-label="close"
          sx={{ background: alpha(brandColors.white.main, 0.16) }}
          onClick={() => handleClose()}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          px: { xs: 3, md: 6 },
          pb: { xs: 3, md: 6 },
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
