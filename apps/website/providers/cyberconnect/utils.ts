import { utils } from 'ethers';

import {
  BiConnectReceivedNotification,
  Notification as ResponseNotification,
} from '../../services-cyberconnect/types.generated';
import { Notification, BiconnectionRequest, CyberConnectFriend } from './types';

/** user addressess comes as lowercased from api
 * we need to use ethers' getAddress to get the checksummed address
 **/
export const normalizeRequestConnection = ({
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
export const normalizeNotification = (
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
export const normalizeFriend = (
  request: BiconnectionRequest,
  myWallet: string
): CyberConnectFriend => ({
  address: request.from === myWallet ? request.to : request.from,
  state: request.state,
});
