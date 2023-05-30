import { createContext, useContext } from 'react';

export type ProtocolTemplateContextType = {
  qrCode?: string;
};

export const ProtocolTemplateContext =
  createContext<ProtocolTemplateContextType>(null);

export const useProtocolTemplateContext = () =>
  useContext(ProtocolTemplateContext);
