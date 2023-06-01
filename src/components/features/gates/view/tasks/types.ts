import { Gates, Tasks } from '@/services/hasura/types';
import { PartialDeep } from 'type-fest';

export type TaskProps<T = any> = {
  task?: PartialDeep<Tasks>;
  gate: PartialDeep<Gates>;
  completeTask: (data: T) => Promise<void>;
  data: T;
  completed: boolean;
  updatedAt: string;
  readOnly: boolean;
  isLoading: boolean;
  isAdmin: boolean;
};