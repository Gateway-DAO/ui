import { object, string, array, mixed, SchemaOf } from 'yup';

type TaskTypes =
  | 'quizz'
  | 'meeting_code'
  | 'token_hold'
  | 'contract_interaction'
  | 'snapshot'
  | 'manual'
  | 'self_verify';

// Create Gate
export type CreateGateTypes = {
  title: string;
  categories: string[];
  description: string;
  image: string;
  skills: string[];
  created_by: string[];
  tasks: TasksSchema;
};

// Tasks
export type TasksSchema = {
  data: Array<Task>;
};

// Task
/* export type Task = {
  title: string;
  description: string;
  task_type: TaskTypes;
  task_data: {
    files: FileTypes[];
  };
}; */

export type Task = {
  title: string;
  description: string;
  task_type: TaskTypes;
  task_data: {
    files: FileTypes[];
  };
};

// Files
export type FileTypes = {
  title: string;
  description: string;
  link: string;
};

const d: TasksSchema = {
  data: [
    {
      title: '',
      description: '',
      task_type: 'quizz',
      task_data: {
        files: [{ description: '', link: '', title: '' }],
      },
    },
  ],
};

export const createGateSchema: SchemaOf<CreateGateTypes> = object({
  title: string().min(2).defined(),
  categories: array().of(string()).defined(),
  description: string().min(2).defined(),
  image: string().min(2).defined(),
  skills: array().of(string()).defined(),
  created_by: array().of(string()).defined(),
  tasks: object({
    data: array()
      .of(
        object({
          title: string().min(2),
          description: string().min(2),
          task_type: mixed<TaskTypes>()
            .oneOf([
              'quizz',
              'meeting_code',
              'token_hold',
              'contract_interaction',
              'snapshot',
              'manual',
              'self_verify',
            ])
            .defined(),
          task_data: object({
            files: array().of(
              object({
                title: string().min(2).defined(),
                description: string().min(2).defined(),
                link: string().min(2).defined(),
              })
            ),
          }).defined(),
        }).defined()
      )
      .defined(),
  }),
});
