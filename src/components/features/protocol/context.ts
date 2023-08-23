import { createContext, useContext } from 'react';

import { Loyalty_Program } from '@/services/hasura/types';
import { PartialDeep } from 'type-fest';

export type ProtocolContextType = {
  qrCode?: string;
  loyalty?: PartialDeep<Loyalty_Program>;
};

export const ProtocolContext = createContext<ProtocolContextType>(null);

export const useProtocolContext = () => useContext(ProtocolContext);
