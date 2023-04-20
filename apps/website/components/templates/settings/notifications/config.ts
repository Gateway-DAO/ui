import { Notification_Type } from '../../../../services/hasura/types';

export const EmailNotifications: Notification_Type[] = [
  'credential_published',
  'credential_received',
  'credential_revoked',
  'credential_suspended',
  'credential_updated',
  'manual_task_event_comment',
  'manual_task_event_send_link',
  'manual_task_event_approve',
  'manual_task_event_reject',
  'manual_task_event_waiting',
  'friend_request_new',
  'friend_request_accepted',
];

export const DappNotifications: Notification_Type[] = [
  'credential_published',
  'credential_received',
  'credential_revoked',
  'credential_suspended',
  'credential_updated',
  'manual_task_event_comment',
  'manual_task_event_send_link',
  'manual_task_event_approve',
  'manual_task_event_reject',
  'manual_task_event_waiting',
  'friend_request_accepted',
];
