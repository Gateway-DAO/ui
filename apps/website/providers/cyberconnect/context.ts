import { createContext, useContext } from 'react';

import type CyberConnect from '@cyberlab/cyberconnect';

import {
  Notification,
  BiconnectionRequest,
  CyberConnectFriend,
} from '../../types/cyberconnect';

type Context = {
  isLoading: boolean;
  cyberConnect?: CyberConnect;
  notifications: Notification[];
  unreadNotifications: number;
  friends: CyberConnectFriend[];
  friendsRequestsInbox: BiconnectionRequest[];
  friendRequestsSent: BiconnectionRequest[];
  onRefetch: () => Promise<any>;
};

export const CyberConnectContext = createContext<Context>({
  isLoading: false,
  notifications: [],
  unreadNotifications: 0,
  friends: [],
  friendRequestsSent: [],
  friendsRequestsInbox: [],
  onRefetch: async () => {},
});

export const useCyberConnect = () => useContext(CyberConnectContext);
