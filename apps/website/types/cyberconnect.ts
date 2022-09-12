/*
 * For some reason, the CyberConnect SDK doesn't supply some typings
 * these comes from their official docs
 * https://docs.cyberconnect.me/
 */

import {
  BiConnectReceivedNotification,
  BidirectionalConnection,
} from '../services-cyberconnect/types.generated';

export type Notification = Pick<
  BiConnectReceivedNotification,
  'toAddress' | 'timestamp' | 'hasRead' | 'id' | 'type'
> &
  Partial<Pick<BiConnectReceivedNotification, 'fromAddress'>>;

export type BiconnectionRequest = Pick<
  BidirectionalConnection,
  'to' | 'from' | 'state'
>;

export type CyberConnectFriend = {
  address: string;
  state: BidirectionalConnection['state'];
};
