import {
  BiConnectReceivedNotification,
  BidirectionalConnection,
} from '../../services-cyberconnect/types.generated';
export type Notification = Pick<
  BiConnectReceivedNotification,
  'toAddress' | 'timestamp' | 'hasRead'
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
