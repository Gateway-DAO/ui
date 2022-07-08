import { object, string, array, mixed, SchemaOf } from 'yup';

type TaskTypes =
  | 'quiz'
  | 'meeting_code'
  | 'token_hold'
  | 'contract_interaction'
  | 'snapshot'
  | 'manual'
  | 'self_verify';

// Creator
export type Creator = {
  id: string;
  name: string;
};

// Create Gate
export type CreateGateTypes = {
  title: string;
  categories: string[];
  description: string;
  image: string;
  skills: string[];
  created_by: Creator[];
  tasks: TasksSchema;
};

// Tasks
export type TasksSchema = {
  data: Array<Task>;
};

// Task
export type Task = {
  title: string;
  description: string;
  task_type: TaskTypes;
  task_data: VerificationCodeData | FileTaskData;
};

// Verification Code
export type VerificationCodeData = {
  code: string;
};

// Files
export type FileTaskData = {
  files: Array<FileTypes>;
};

// Files
export type FileTypes = {
  title: string;
  description: string;
  link: string;
};

export const createGateSchema: SchemaOf<CreateGateTypes> = object({
  title: string().min(2).defined(),
  categories: array().of(string()).defined(),
  description: string().min(2).defined(),
  image: string().min(2).defined(),
  skills: array().of(string()).defined(),
  created_by: array().of(mixed<Creator>()).defined(),
  tasks: object({
    data: array().of(
      object({
        title: string().min(2),
        description: string().min(2),
        task_type: mixed<TaskTypes>()
          .oneOf([
            'quiz',
            'meeting_code',
            'token_hold',
            'contract_interaction',
            'snapshot',
            'manual',
            'self_verify',
          ])
          .defined(),
        task_data: object()
          .when('task_type', (type, schema) => {
            switch (type) {
              case 'self_verify':
                schema = object({
                  files: array().of(
                    object({
                      title: string().min(2).defined(),
                      description: string().min(2).defined(),
                      link: string().min(2).defined(),
                    })
                  ),
                });
                break;
              case 'meeting_code':
                schema = object({
                  code: string().min(2).defined(),
                });
                break;
            }
            return schema;
          })
          .defined(),
      })
    ),
  }),
});
