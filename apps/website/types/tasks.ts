import {
  LinkPreviewOutput,
  Scalars,
} from '../services/graphql/types.generated';

export type TaskType = Exclude<Scalars['task_type'], 'contract_interaction'>;
export type ManualTaskEventType = Scalars['manual_task_event_type'];

export type ManualTaskEventData = {
  link?: LinkPreviewOutput;
  comment?: string;
};
