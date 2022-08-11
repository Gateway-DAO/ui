import { PropsWithChildren } from 'react';

import { cyberConnect } from './client';
import { CyberConnectContext } from './context';

export function CyberConnectProvider({ children }: PropsWithChildren<unknown>) {
  return (
    <CyberConnectContext.Provider value={{ cyberConnect }}>
      {children}
    </CyberConnectContext.Provider>
  );
}
