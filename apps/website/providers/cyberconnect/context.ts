import { createContext, useContext } from 'react';

import type CyberConnect from '@cyberlab/cyberconnect';

import { Notification, BiconnectionRequest } from './types';

type Context = {
  cyberConnect?: CyberConnect;
  isLoading: boolean;
  notifications: Notification[];
  friends: BiconnectionRequest[];
  friendsRequestsInbox: BiconnectionRequest[];
  friendRequestsSent: BiconnectionRequest[];
  onResetCyberConnectProfile: () => Promise<any>;
};

export const CyberConnectContext = createContext<Context>({
  isLoading: false,
  notifications: [],
  friends: [],
  friendRequestsSent: [],
  friendsRequestsInbox: [],
  onResetCyberConnectProfile: async () => {},
});

export const useCyberConnect = () => useContext(CyberConnectContext);
