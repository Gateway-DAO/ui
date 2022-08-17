import { PropsWithChildren } from 'react';

import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { useAccount } from 'wagmi';

import { gqlCyberConnectClient } from '../../services/cyberconnect-api';
import { createCyberConnectClient } from './client';
import { CyberConnectContext } from './context';

export function CyberConnectProvider({ children }: PropsWithChildren<unknown>) {
  const { data } = useAccount();

  const cyberConnect =
    typeof window !== 'undefined' ? createCyberConnectClient() : null;

  const CyberconnectProfile = useQuery(
    ['cyberconnect-profile', data?.address],
    () =>
      gqlCyberConnectClient.request(
        gql`
          query user_notifications($address: String!) {
            identity(address: $address, network: ETH) {
              address
              domain
              avatar
              joinTime
              twitter {
                handle
                avatar
                verified
                tweetId
                source
                followerCount
              }
              github {
                username
                gistId
                userId
              }
              followerCount(namespace: "GatewayDAO")
              followingCount(namespace: "GatewayDAO")
              followings(namespace: "GatewayDAO", first: 2, after: "-1") {
                pageInfo {
                  startCursor
                  endCursor
                  hasNextPage
                  hasPreviousPage
                }
                list {
                  address
                  domain
                  avatar
                  alias
                  namespace
                  lastModifiedTime
                  verifiable
                }
              }
              followers(namespace: "GatewayDAO", first: 2, after: "-1") {
                pageInfo {
                  startCursor
                  endCursor
                  hasNextPage
                  hasPreviousPage
                }
                list {
                  address
                  domain
                  avatar
                  alias
                  namespace
                  lastModifiedTime
                  verifiable
                }
              }
              friends(namespace: "GatewayDAO", first: 2, after: "-1") {
                pageInfo {
                  startCursor
                  endCursor
                  hasNextPage
                  hasPreviousPage
                }
                list {
                  address
                  domain
                  avatar
                  alias
                  namespace
                  lastModifiedTime
                  verifiable
                }
              }
              unreadNotificationCount(namespaces: ["GatewayDAO"])
              notifications(namespaces: ["GatewayDAO"], first: 2, after: "-1") {
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                  endCursor
                  startCursor
                }
                list {
                  id
                  toAddress
                  network
                  namespace
                  hasRead
                  type
                  timestamp
                  ... on NewConnectionNotification {
                    fromAddress
                    connectionType
                  }
                  ... on BiConnectReceivedNotification {
                    fromAddress
                  }
                  ... on BiConnectAcceptedNotification {
                    fromAddress
                  }
                }
              }
            }
          }
        `,
        { address: data?.address }
      ),
    { enabled: !!data?.address }
  );

  console.log(CyberconnectProfile.data);

  return (
    <CyberConnectContext.Provider value={{ cyberConnect }}>
      {children}
    </CyberConnectContext.Provider>
  );
}
