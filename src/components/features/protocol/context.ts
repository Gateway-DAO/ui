import { createContext, useContext } from 'react';

export type ProtocolContextType = {
  qrCode?: string;
};

export const ProtocolContext = createContext<ProtocolContextType>(null);

export const useProtocolContext = () => useContext(ProtocolContext);
