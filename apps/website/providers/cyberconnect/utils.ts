import { utils } from 'ethers';

import {
  BiConnectReceivedNotification,
  Notification as ResponseNotification,
} from '../../services-cyberconnect/types.generated';
import { Notification, BiconnectionRequest } from './types';

/** user addressess comes as lowercased from api
 * we need to use ethers' getAddress to get the checksummed address
 **/
export const normalizeFriendConnection = ({
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
