import { PartialDeep } from 'type-fest';

import { Tasks } from '../../../../../../services/graphql/types.generated';
export type TaskProps<T = any> = {
  task?: PartialDeep<Tasks>;
  completeTask: (data: T) => void;
  data: T;
  completed: boolean;
  updatedAt: string;
  readOnly: boolean;
  isLoading: boolean;
  isAdmin: boolean;
};
