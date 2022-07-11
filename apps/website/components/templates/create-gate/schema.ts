import { object, string, array, mixed, lazy, number, SchemaOf } from 'yup';
// import { z } from "zod";

// type TaskTypes =
//   | 'quiz'
//   | 'meeting_code'
//   | 'token_hold'
//   | 'contract_interaction'
//   | 'snapshot'
//   | 'manual'
//   | 'self_verify';

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
  // created_by: Creator[];
  tasks: TasksSchema;
};

// Tasks
export type TasksSchema = {
  data: Array<Task>;
};

// Task

export type SelfVerifyTask = {
  task_type: 'self_verify';
  task_data: FileTaskData;
};

export type MeetingCodeTask = {
  task_type: 'meeting_code';
  task_data: VerificationCodeData;
};

export type Task = {
  title: string;
  description: string;
  // task_type: TaskTypes;
  // task_data: FileTaskData | VerificationCodeData;
} & (SelfVerifyTask | MeetingCodeTask);


type TaskTypes = Task['task_type'];
type TaskData = Task['task_data'];

// Verification Code
export type VerificationCodeData = {
  id: string;
  code?: string;
};

// Files
export type FileTaskData = {
  id: string;
  files?: Array<FileTypes>;
};

// Files
export type FileTypes = {
  id: number;
  title: string;
  description: string;
  link: string;
};


const fileTaskDataSchema: SchemaOf<FileTaskData> = object({
  id: string().min(2),
  files: array().of(
    object({
      id: number().min(2),
      title: string().min(2),
      description: string().min(2),
      link: string().min(2),
    })
  ),
});

const verificationCodeDataSchema = object<VerificationCodeData>({
  id: string().min(2),
  code: string().min(2).optional(),
});

const taskMeetingCodeSchema = object({
  task_type: string().equals(['meeting_code'])
    .defined(),
  task_data:
  });

const taskSelfVerifySchema: SchemaOf<SelfVerifyTask> = object({
  task_type: string().equals(['self_verify'])
    .defined(),
  task_data: fileTaskDataSchema.defined()
  });

const taskBaseSchema: SchemaOf<Task> = object({
  title: string().min(2),
  description: string().min(2),
  task_type: mixed<TaskTypes>().oneOf<TaskTypes>([
    'meeting_code',
    'self_verify'
  ]),
task_data: mixed<TaskData>().when('task_type', (type: TaskTypes) => {
switch(type) {
  case 'meeting_code': return verificationCodeDataSchema.defined();
  default: return fileTaskDataSchema.defined();
}
})
})


/*  .concat(mixed().oneOf([
  taskMeetingCodeSchema,
taskSelfVerifySchema
])); */


export const createGateSchema: SchemaOf<CreateGateTypes> = object({
  title: string().min(2).defined(),
  categories: array().of(string()).defined(),
  description: string().min(2).defined(),
  image: string().min(2).defined(),
  skills: array().of(string()).defined(),
  // created_by: array().of(object<Creator>({
  //   id:string(),
  //   name: string(),
  // })).defined(),
  tasks: object({
    data: array().of(
      taskSchema
      )
    ),
  }),
});
