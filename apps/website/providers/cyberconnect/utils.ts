import { utils } from 'ethers';

import {
  BiConnectReceivedNotification,
  Notification as ResponseNotification,
  NotificationType,
  User_NotificationsQuery,
} from '../../services-cyberconnect/types.generated';
import {
  Notification,
  BiconnectionRequest,
  CyberConnectFriend,
} from '../../types/cyberconnect';

/** user addressess comes as lowercased from api
 * we need to use ethers' getAddress to get the checksummed address
 **/
const normalizeRequestConnection = ({
  to,
  from,
  state,
}: BiconnectionRequest): BiconnectionRequest => ({
  state,
  to: utils.getAddress(to),
  from: utils.getAddress(from),
});

/** user addressess comes as lowercased from api
 * we need to use ethers' getAddress to get the checksummed address
 **/
const normalizeNotification = (
  notification: ResponseNotification | BiConnectReceivedNotification
): Notification => ({
  ...notification,
  toAddress: utils.getAddress(notification.toAddress),
  ...((notification as BiConnectReceivedNotification)?.fromAddress
    ? {
        fromAddress: utils.getAddress(
          (notification as BiConnectReceivedNotification).fromAddress
        ),
      }
    : {}),
});

/**
 * parses friend connection
 */
const normalizeFriend = (
  request: BiconnectionRequest,
  myWallet: string
): CyberConnectFriend => ({
  address: utils.getAddress(
    request.from === myWallet.toLowerCase() ? request.to : request.from
  ),
  state: request.state,
});

export const useNormalizeData = (
  data: User_NotificationsQuery | undefined,
  wallet: string
) => {
  /* Normalize data */
  const friendsRequestsInbox =
    data?.identity?.friendRequestsInbox?.list.map(
      ({ bidirectionalConnection }) =>
        normalizeRequestConnection(bidirectionalConnection)
    ) ?? [];
  const friendRequestsSent =
    data?.identity?.friendRequestsSent?.list.map(
      ({ bidirectionalConnection }) =>
        normalizeRequestConnection(bidirectionalConnection)
    ) ?? [];

  const notifications =
    data?.identity?.notifications?.list
      .filter(
        (n: BiConnectReceivedNotification) =>
          // TODO: Commented for now because no design for now
          // n.type === NotificationType.BiconnectAccepted ||
          n.type === NotificationType.BiconnectReceived &&
          data?.identity?.friendRequestsInbox?.list.some(
            ({ bidirectionalConnection }) =>
              bidirectionalConnection.from === n.fromAddress
          )
      )
      .map((n) => normalizeNotification(n)) ?? [];

  const friends =
    data?.identity?.bidirectionalFriends?.list.map(
      ({ bidirectionalConnection }) =>
        normalizeFriend(bidirectionalConnection, wallet)
    ) ?? [];

  return {
    friendsRequestsInbox,
    friendRequestsSent,
    notifications,
    friends,
  };
};
