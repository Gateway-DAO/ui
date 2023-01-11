import { createContext, useContext } from 'react';

export type CredentialTemplateContextType = {
  qrCode?: string;
};

export const CredentialTemplateContext =
  createContext<CredentialTemplateContextType>(null);

export const useCredentialTemplateContext = () =>
  useContext(CredentialTemplateContext);
