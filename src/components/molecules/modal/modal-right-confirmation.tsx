import { ReactNode } from 'react';

import ModalRight from '@/components/molecules/modal/modal-right';
import { brandColors } from '@/theme';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Stack, Typography, alpha } from '@mui/material';

type Props = {
  title: string;
  children: ReactNode;
  open: boolean;
  handleClose: () => void;
};

export function ModalRightConfirmation({
  title,
  children,
  open,
  handleClose,
}: Props) {
  return (
    <Stack>
      <ModalRight open={open} handleClose={handleClose}>
        <Stack
          sx={{
            pt: { xs: 3, md: 6 },
            pb: { xs: 2, md: 3 },
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography variant="h6" role="h2">
            {title}
          </Typography>
          <IconButton
            aria-label="close"
            sx={{ background: alpha(brandColors.white.main, 0.16) }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
        {children}
      </ModalRight>
    </Stack>
  );
}
