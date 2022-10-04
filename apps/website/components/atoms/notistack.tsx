/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext } from 'react';

import { SnackbarOrigin, SnackbarProvider, VariantType } from 'notistack';

import { brandColors } from '@gateway/theme';

type NotistackContextProps = {
  maxSnack?: number;
  variant?: VariantType;
  preventDuplicate?: boolean;
  position?: SnackbarOrigin;
  autoHideDuration?: number;
  hideIconVariant?: boolean;
  onClose?: () => void;
  onEnter?: () => void;
  onEntering?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExiting?: () => void;
  onExited?: () => void;
};

export const NotistackContext = createContext<NotistackContextProps>({
  maxSnack: 3, // Maximum snackbars that can be stacked on top of one another.
  variant: 'default', // 'default' | 'error' | 'success' | 'warning' | 'info'
  preventDuplicate: true,
  position: {
    vertical: 'top', // 'top' | 'bottom'
    horizontal: 'center', // 'left' | 'center' | 'right'
  },
  autoHideDuration: 3000,
});

const Notistack = (props) => {
  const notistackContext = useContext(NotistackContext);
  const notistackRef = React.useRef<SnackbarProvider>();

  const defaultStyle = (): React.CSSProperties => {
    return notistackContext.variant == 'default'
      ? {
          backgroundColor: brandColors.purple.main,
          color: brandColors.white.main,
        }
      : null;
  };

  return (
    <SnackbarProvider
      ref={notistackRef}
      variant={notistackContext.variant}
      maxSnack={notistackContext.maxSnack}
      preventDuplicate={notistackContext.preventDuplicate}
      anchorOrigin={notistackContext.position}
      autoHideDuration={notistackContext.autoHideDuration}
      style={defaultStyle()}
    >
      {props.children}
    </SnackbarProvider>
  );
};

export default Notistack;
