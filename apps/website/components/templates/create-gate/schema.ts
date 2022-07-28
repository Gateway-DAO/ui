import { FieldError } from 'react-hook-form';
import { z } from 'zod';

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
export type SelfVerifyTask = {
  task_type: 'self_verify';
  task_data: FileTaskData;
};

export type MeetingCodeTask = {
  task_type: 'meeting_code';
  task_data: VerificationCodeData;
};

export type QuizTask = {
  task_type: 'quiz';
  task_data: QuizTaskData;
};

export type SnapshotTask = {
  task_type: 'snapshot';
  task_data: SnapshotData;
};

export type HoldTokenTask = {
  task_type: 'token_hold';
  task_data: HoldTokenData;
};

export type Task = {
  title: string;
  description: string;
} & (
  | SelfVerifyTask
  | MeetingCodeTask
  | QuizTask
  | SnapshotTask
  | HoldTokenTask
);

// Verification Code
export type VerificationCodeData = {
  code?: string;
};

export type VerificationCodeDataError = {
  id?: FieldError;
  code?: FieldError;
};

// Quiz
export type QuizTaskData = {
  questions?: Question[];
  pass_score?: number;
};

export type QuizTaskDataError = {
  id?: FieldError;
  pass_score?: FieldError;
  questions?: {
    id?: FieldError;
    question?: FieldError;
    type?: FieldError;
    options?: {
      id?: FieldError;
      value?: FieldError;
      correct?: FieldError;
    }[] &
      FieldError;
  }[];
};

export type Question = {
  id?: string;
  order: number;
  question: string;
  type: string;
  options?: Option[];
};

export type Option = {
  id?: string;
  value: string;
  correct: boolean;
};

// Snapshot
export type SnapshotData = {
  proposal_number?: string;
  space_id?: string;
};

export type SnapshotDataError = {
  id?: FieldError;
  proposal_number?: FieldError;
  space_id?: FieldError;
};

// Hold Token
export type HoldTokenData = {
  chain?: string;
  token_address?: string;
  quantity?: string;
};

export type HoldTokenDataError = {
  id?: FieldError;
  chain?: FieldError;
  token_address?: FieldError;
  quantity?: FieldError;
};

// Files
export type FileTaskData = {
  files?: Array<FileTypes>;
};

export type FileTaskDataError = {
  id?: FieldError;
  files?: {
    id?: FieldError;
    title?: FieldError;
    description?: FieldError;
    link?: FieldError;
  }[];
};

// Files
export type FileTypes = {
  title: string;
  description: string;
  link: string;
};

export type verificationCodeType = {
  id: string;
  code: string;
};

const fileTaskDataSchema = z.object({
  files: z
    .object({
      title: z.string().min(2),
      description: z.string().min(2),
      link: z.string().min(2),
    })
    .array(),
});

const snapshotTaskDataSchema = z.object({
  proposal_number: z.string().min(2),
  space_id: z.string().min(2),
});

const holdTokenTaskDataSchema = z.object({
  chain: z.string().min(2),
  token_address: z.string().min(2),
  quantity: z.string().min(1),
});

export const verificationCodeDataSchema = z.object({
  code: z.string().min(2),
});

export const taskMeetingCodeSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
  task_type: z.literal('meeting_code'),
  task_data: verificationCodeDataSchema,
});

export const quizDataSchema = z.object({
  pass_score: z.number().min(1).max(100),
  questions: z.array(
    z.object({
      question: z.string().min(2),
      type: z.enum(['single', 'multiple']),
      options: z
        .array(
          z.object({
            value: z.string().min(2),
            correct: z.boolean(),
          })
        )
        .refine(
          (options) => options.filter((option) => option.correct).length > 0,
          'At least one option must be correct'
        ),
    })
  ),
});

export const taskQuizSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
  task_type: z.literal('quiz'),
  task_data: quizDataSchema,
});

export const taskHoldTokenSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
  task_type: z.literal('token_hold'),
  task_data: holdTokenTaskDataSchema,
});

export const taskSelfVerifySchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
  task_type: z.literal('self_verify'),
  task_data: fileTaskDataSchema,
});

export const taskSnapshotSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
  task_type: z.literal('snapshot'),
  task_data: snapshotTaskDataSchema,
});

export const createGateSchema = z.object({
  title: z.string().min(2),
  categories: z.array(z.string()),
  description: z.string().min(2),
  image: z.string({ required_error: 'Image is required' }).min(2),
  skills: z.array(z.string()),
  created_by: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
  tasks: z.object({
    data: z.array(
      z.discriminatedUnion('task_type', [
        taskSelfVerifySchema,
        taskMeetingCodeSchema,
        taskQuizSchema,
        taskSnapshotSchema,
        taskHoldTokenSchema,
      ])
    ),
  }),
});
