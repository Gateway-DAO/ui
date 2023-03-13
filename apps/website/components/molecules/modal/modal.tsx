import { ReactNode } from 'react';

import { Dialog, Stack, Paper } from '@mui/material';

type Props = {
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
  modalTitle: string;
  modalDescription: string;
};

export default function Modal({
  open,
  handleClose,
  children,
  modalTitle,
  modalDescription,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby={modalTitle}
      aria-describedby={modalDescription}
    >
      <Paper
        direction="column"
        elevation={5}
        component={Stack}
        sx={{
          px: { xs: 2, lg: 3 },
          py: { xs: 2, lg: 3 },
          height: '100%',
          width: { md: '100%' },
          display: 'flex',
          borderRadius: 1,
        }}
      >
        {children}
      </Paper>
    </Dialog>
  );
}
