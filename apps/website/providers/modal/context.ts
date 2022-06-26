/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext } from 'react';

export type Context = { isOpen: boolean; open: () => void };

export const ModalContext = createContext<Context>({
  isOpen: false,
  open: () => {},
});

export const useModal = () => useContext(ModalContext);
