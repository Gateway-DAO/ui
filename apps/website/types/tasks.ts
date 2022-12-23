import { LinkPreviewOutput, Scalars } from '../services/hasura/types';

export type TaskType = Scalars['task_type'] | 'recaptcha';
export type ManualTaskEventType = Scalars['manual_task_event_type'];

export type ManualTaskEventData = {
  link?: LinkPreviewOutput;
  comment?: string;
};
