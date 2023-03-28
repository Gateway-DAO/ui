import { createContext, useContext } from 'react';

import { PartialDeep } from 'type-fest';

import { Credential } from '../../../services/gateway-protocol/types';

export type ProtocolTemplateContextType = {
  qrCode?: string;
  credential?: PartialDeep<Credential>;
};

export const ProtocolTemplateContext =
  createContext<ProtocolTemplateContextType>(null);

export const useProtocolTemplateContext = () =>
  useContext(ProtocolTemplateContext);
