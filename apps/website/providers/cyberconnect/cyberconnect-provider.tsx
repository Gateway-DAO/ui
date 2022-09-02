import { PropsWithChildren, useEffect } from 'react';

import { useQuery } from 'react-query';

import { cyberConnectSDK } from '../../services-cyberconnect/api';
import { useAuth } from '../auth';
import { createCyberConnectClient } from './client';
import { CyberConnectContext } from './context';
import { useNormalizeData } from './utils';

export function CyberConnectProvider({ children }: PropsWithChildren<unknown>) {
  const { me } = useAuth();

  const { wallet } = me ?? {};

  const cyberConnect =
    typeof window !== 'undefined' ? createCyberConnectClient() : null;

  const { isLoading, data, refetch, remove } = useQuery(
    ['cyberconnect-profile', wallet],
    () => cyberConnectSDK.user_notifications({ address: wallet }),
    { enabled: !!wallet, refetchOnWindowFocus: true, refetchInterval: 10000 }
  );

  useEffect(() => {
    if (!wallet) remove();
  }, [remove, wallet]);

  const { friendsRequestsInbox, friendRequestsSent, notifications, friends } =
    useNormalizeData(data, wallet);

  return (
    <CyberConnectContext.Provider
      value={{
        cyberConnect,
        notifications,
        unreadNotifications:
          notifications.filter((n) => !n.hasRead).length ?? 0,
        friends,
        friendsRequestsInbox,
        friendRequestsSent,
        isLoading,
        onRefetch: refetch,
      }}
    >
      {children}
    </CyberConnectContext.Provider>
  );
}
