/*
 * For some reason, the CyberConnect SDK doesn't supply some typings
 * these comes from their official docs
 * https://docs.cyberconnect.me/
 */

import type { Blockchain } from '@cyberlab/cyberconnect';

export enum NotificationType {
  NEW_CONNECTION = 'NEW_CONNECTION',
  BICONNECT_RECEIVED = 'BICONNECT_RECEIVED',
  BICONNECT_ACCEPTED = 'BICONNECT_ACCEPTED',
}

export interface Notification {
  id: string;
  toAddress: string;
  network: Blockchain;
  namespace: string;
  hasRead: boolean;
  type: NotificationType;
  timestamp: string;
}
