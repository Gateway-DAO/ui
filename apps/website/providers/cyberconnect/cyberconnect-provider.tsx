import { PropsWithChildren } from 'react';

import { useQuery } from 'react-query';
import { useAccount } from 'wagmi';

import { gqlCyberConnectMethods } from '../../services-cyberconnect/api';
import { createCyberConnectClient } from './client';
import { CyberConnectContext } from './context';
import {
  normalizeRequestConnection,
  normalizeNotification,
  normalizeFriend,
} from './utils';

export function CyberConnectProvider({ children }: PropsWithChildren<unknown>) {
  const {
    data: { address },
  } = useAccount();

  const cyberConnect =
    typeof window !== 'undefined' ? createCyberConnectClient() : null;

  const { isLoading, isRefetching, data, refetch } = useQuery(
    ['cyberconnect-profile', address],
    () => gqlCyberConnectMethods.user_notifications({ address }),
    { enabled: !!address }
  );

  /* Normalize data */
  const friendsRequestsInbox =
    data?.identity?.friendRequestsInbox?.list
      /* .filter(
        ({ bidirectionalConnection }) =>
          bidirectionalConnection.namespace === 'GatewayDAO'
      ) */
      .map(({ bidirectionalConnection }) =>
        normalizeRequestConnection(bidirectionalConnection)
      ) ?? [];
  const friendRequestsSent =
    data?.identity?.friendRequestsSent?.list
      /* .filter(
        ({ bidirectionalConnection }) =>
          bidirectionalConnection.namespace === 'GatewayDAO'
      ) */
      .map(({ bidirectionalConnection }) =>
        normalizeRequestConnection(bidirectionalConnection)
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
        normalizeFriend(bidirectionalConnection, address)
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
