/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';

import { brandColors } from '@/theme';
import { SnackbarProvider } from 'notistack';

const Notistack = (props) => {
  const notistackRef = React.useRef<SnackbarProvider>();

  return (
    <SnackbarProvider
      ref={notistackRef}
      variant="default"
      maxSnack={6}
      preventDuplicate={true}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      autoHideDuration={6000}
      style={{
        backgroundColor: brandColors.purple.main,
        color: brandColors.white.main,
      }}
    >
      {props.children}
    </SnackbarProvider>
  );
};

export default Notistack;
