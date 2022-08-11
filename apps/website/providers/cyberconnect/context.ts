import { createContext, useContext } from 'react';

import type CyberConnect from '@cyberlab/cyberconnect';

import { cyberConnect } from './client';

type Context = {
  cyberConnect: CyberConnect;
};

export const CyberConnectContext = createContext<Context>({ cyberConnect });

export const useCyberConnect = () => useContext(CyberConnectContext);
