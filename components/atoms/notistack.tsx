/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';

import { SnackbarProvider } from 'notistack';

import { brandColors } from 'apps/website/theme';

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
