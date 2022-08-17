import { createContext, useContext } from 'react';

import type CyberConnect from '@cyberlab/cyberconnect';

type Context = {
  cyberConnect?: CyberConnect;
};

export const CyberConnectContext = createContext<Context>({});

export const useCyberConnect = () => useContext(CyberConnectContext);
