import { useState } from 'react';

import { AlertColor } from '@mui/material';
import { SnackbarOrigin } from '@mui/material/Snackbar';

/**
 * Initial structure for snackbar usage
 */

type Payload = Partial<SnackbarOrigin> & {
  message?: string;
  type?: AlertColor;
};

interface State extends Payload {
  open: boolean;
  type: AlertColor;
}

type Snackbar = State & {
  onOpen: (newState: Payload) => void;
  handleClick: (newState: Payload) => () => void;
  handleClose: () => void;
};

/**
 * `useSnackbar` is a function that returns an object with the current state and functions to update
 * the state
 * @returns The return value is an object that contains the state and the functions that are used to
 * update the state.
 */
export const useSnackbar = (): Snackbar => {
  const [state, setState] = useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    type: 'warning',
  });

  /**
   * `onOpen` is a function that takes a `Payload` object as an argument and returns a function that
   * takes a `State` object as an argument and returns a new `State` object
   * @param {Payload} newState - Payload - This is the new state that will be merged with the old
   * state.
   */
  const onOpen = (newState: Payload) => {
    setState((oldState) => ({ ...oldState, open: true, ...newState }));
  };

  /**
   * It takes in a newState and returns a function that takes in no arguments.
   * @param {Payload} newState - Payload - this is the new state that will be set when the button is
   * clicked.
   * @returns a function
   */
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
