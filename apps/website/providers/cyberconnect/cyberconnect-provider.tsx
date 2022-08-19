import { PropsWithChildren } from 'react';

import { useQuery } from 'react-query';
import { useAccount } from 'wagmi';

import { gqlCyberConnectMethods } from '../../services-cyberconnect/api';
import { createCyberConnectClient } from './client';
import { CyberConnectContext } from './context';
import { normalizeFriendConnection, normalizeNotification } from './utils';

export function CyberConnectProvider({ children }: PropsWithChildren<unknown>) {
  const { data: account } = useAccount();

  const cyberConnect =
    typeof window !== 'undefined' ? createCyberConnectClient() : null;

  const { isLoading, isRefetching, data, refetch } = useQuery(
    ['cyberconnect-profile', account?.address],
    () =>
      gqlCyberConnectMethods.user_notifications({ address: account!.address }),
    { enabled: !!account?.address }
  );

  /* Normalize data */
  const friendsRequestsInbox =
    data?.identity?.friendRequestsInbox?.list
      /* .filter(
        ({ bidirectionalConnection }) =>
          bidirectionalConnection.namespace === 'GatewayDAO'
      ) */
      .map(({ bidirectionalConnection }) =>
        normalizeFriendConnection(bidirectionalConnection)
      ) ?? [];
  const friendRequestsSent =
    data?.identity?.friendRequestsSent?.list
      /* .filter(
        ({ bidirectionalConnection }) =>
          bidirectionalConnection.namespace === 'GatewayDAO'
      ) */
      .map(({ bidirectionalConnection }) =>
        normalizeFriendConnection(bidirectionalConnection)
      ) ?? [];

  const notifications =
    data?.identity?.notifications?.list
      .filter(({ namespace }) => namespace === 'GatewayDAO')
      .map((n) => normalizeNotification(n)) ?? [];

  const friends =
    data?.identity?.bidirectionalFriends?.list
      /* .filter(
        ({ bidirectionalConnection }) =>
          bidirectionalConnection.namespace === 'GatewayDAO'
      ) */
      .map(({ bidirectionalConnection }) =>
        normalizeFriendConnection(bidirectionalConnection)
      ) ?? [];

  return (
    <CyberConnectContext.Provider
      value={{
        cyberConnect,
        isLoading: isLoading || isRefetching,
        notifications,
        friends,
        friendsRequestsInbox,
        friendRequestsSent,
        onResetCyberConnectProfile: refetch,
      }}
    >
      {children}
    </CyberConnectContext.Provider>
  );
}
