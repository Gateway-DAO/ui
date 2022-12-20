import { utils } from 'ethers';

import {
  BiConnectReceivedNotification,
  Notification as ResponseNotification,
  NotificationType,
  User_NotificationsQuery,
} from '../../services/cyberconnect/types';
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
  const friends =
    data?.identity?.bidirectionalFriends?.list.map(
      ({ bidirectionalConnection }) =>
        normalizeFriend(bidirectionalConnection, wallet)
    ) ?? [];

  const notifications: Notification[] =
    data?.identity?.notifications?.list?.reduce(
      (acc, notification: BiConnectReceivedNotification) => {
        // If notification has already been processed, skip it
        const hasNotification = acc.some(
          (n) => n.fromAddress.toLowerCase() === notification.fromAddress
        );
        if (hasNotification) {
          return acc;
        }

        const isFriendAccepted =
          notification.type === NotificationType.BiconnectAccepted &&
          friends.some(
            (friend) =>
              friend.address.toLowerCase() === notification.fromAddress
          );

        // Only shows a request notification if the user has not accepted the request

        const isFriendReceived =
          notification.type === NotificationType.BiconnectReceived &&
          friendsRequestsInbox.some(
            (request) => request.from.toLowerCase() === notification.fromAddress
          );

        if (!isFriendAccepted && !isFriendReceived) {
          return acc;
        }

        return [...acc, normalizeNotification(notification)];
      },
      [] as Notification[]
    ) ?? [];

  return {
    friendsRequestsInbox,
    friendRequestsSent,
    notifications,
    friends,
  };
};
