import * as React from 'react';

import { Stack } from '@mui/material';
import Dialog from '@mui/material/Dialog';
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
  children: React.ReactNode;
};

export default function ModalRight({ children, open }: Props) {
  return (
    <Dialog
      fullScreen
      open={open}
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
      <Stack
        sx={{
          px: { xs: 3, md: 6 },
          pb: { xs: 3, md: 6 },
        }}
      >
        {children}
      </Stack>
    </Dialog>
  );
}
