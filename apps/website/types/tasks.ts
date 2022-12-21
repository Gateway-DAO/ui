import { LinkPreviewOutput, Scalars } from '../services/hasura/types';

export type TaskType = Exclude<
  Scalars['task_type'] | 'recaptcha',
  'contract_interaction'
>;
export type ManualTaskEventType = Scalars['manual_task_event_type'];

export type ManualTaskEventData = {
  link?: LinkPreviewOutput;
  comment?: string;
};
