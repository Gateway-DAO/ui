import { useState } from 'react';

import { SnackbarOrigin } from '@mui/material/Snackbar';

/**
 * Initial structure for snackbar usage
 */

type Payload = Partial<SnackbarOrigin> & {
  message?: string;
};

interface State extends Payload {
  open: boolean;
}

export const useSnackbar = () => {
  const [state, setState] = useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const onOpen = (newState: Payload) => {
    setState((oldState) => ({ ...oldState, open: true, ...newState }));
  };
  const handleClick = (newState: Payload) => () => {
    setState((oldState) => ({ ...oldState, open: true, ...newState }));
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return {
    ...state,
    onOpen,
    handleClick,
    handleClose,
  };
};
