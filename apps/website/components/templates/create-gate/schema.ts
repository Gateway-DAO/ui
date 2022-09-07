import { FieldError, NestedValue } from 'react-hook-form';
import { z } from 'zod';

// Creator
export type Creator = {
  id: string;
  name: string;
};

// Draft Gate
export type DraftGateTypes = {
  id?: string;
  title: string;
  categories: string[];
  description: string;
  image: string;
  skills: string[];
  created_by: Creator[];
  tasks: DraftTasksSchema;
};

// Create Gate
export type CreateGateTypes = {
  id?: string;
  title: string;
  categories: NestedValue<string[]>;
  description: string;
  image: string;
  skills: NestedValue<string[]>;
  created_by: Creator[];
  tasks: TasksSchema;
};

// Tasks
export type TasksSchema = {
  data: Array<Task>;
};

// Tasks when we get them back from a previous draft
export type DraftTasksSchema = Array<Task>;

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
  id?: string;
  gate_id?: string;
  task_id?: string;
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
  type?: string;
};

export type SnapshotDataError = {
  id?: FieldError;
  proposal_number?: FieldError;
  type?: FieldError;
};

// Hold Token
export type HoldTokenData = {
  chain?: string;
  token_address?: string;
  quantity?: number;
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
      title: z
        .string()
        .min(2, 'The file title must contain at least 2 character(s)'),
      description: z
        .string()
        .min(2, 'The file description must contain at least 2 character(s)'),
      link: z.string().url('Invalid URL'),
    })
    .array(),
});

const snapshotTaskDataSchema = z.object({
  proposal_number: z
    .string()
    .url('Invalid Snapshot URL or proposal number')
    .refine((val) => val.includes('snapshot.org'), {
      message: 'This is not a Snapshot URL',
    })
    .transform((val) => val.split('/').pop())
    .or(
      z
        .string()
        .min(2)
        .refine(
          (val) =>
            val.startsWith('Qm') ||
            val.startsWith('0x') ||
            val.startsWith('baf'),
          {
            message: 'This is not a valid Snapshot proposal',
          }
        )
    ),
  type: z.enum(['proposal', 'vote']),
});

const holdTokenTaskDataSchema = z.object({
  chain: z.number(),
  token_address: z
    .string()
    .min(2, 'The token address must contain at least 2 character(s)')
    .length(42, 'The token address must contain exactly 42 character(s)')
    .refine((val) => val.startsWith('0x'), {
      message: 'This is not a valid token address',
    }),
  quantity: z.number({
    invalid_type_error: 'Quantity must be a number',
    required_error: "Quantity can't be empty",
  }),
});

export const verificationCodeDataSchema = z.object({
  code: z
    .string()
    .min(2, 'Verification code must contain at least 2 character(s)'),
});

export const taskMeetingCodeSchema = z.object({
  id: z.string().optional(),
  task_id: z.string().optional(),
  title: z.string().min(2, 'The title must contain at least 2 character(s)'),
  description: z
    .string()
    .min(2, 'The description must contain at least 2 character(s)'),
  task_type: z.literal('meeting_code'),
  task_data: verificationCodeDataSchema,
});

export const quizDataSchema = z.object({
  pass_score: z.number().min(1).max(100),
  questions: z.array(
    z.object({
      question: z
        .string()
        .min(2, 'Question must contain at least 2 character(s)'),
      type: z.enum(['single', 'multiple']),
      options: z
        .array(
          z.object({
            value: z
              .string()
              .min(1, 'Answer must contain at least 1 character'),
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
  id: z.string().optional(),
  task_id: z.string().optional(),
  title: z.string().min(2, 'Quiz title must contain at least 2 character(s)'),
  description: z
    .string()
    .min(2, 'Quiz description must contain at least 2 character(s)'),
  task_type: z.literal('quiz'),
  task_data: quizDataSchema,
});

export const taskHoldTokenSchema = z.object({
  id: z.string().optional(),
  task_id: z.string().optional(),
  title: z
    .string()
    .min(2, 'Hold Token title must contain at least 2 character(s)'),
  description: z
    .string()
    .min(2, 'The description must contain at least 2 character(s)'),
  task_type: z.literal('token_hold'),
  task_data: holdTokenTaskDataSchema,
});

export const taskSelfVerifySchema = z.object({
  id: z.string().optional(),
  task_id: z.string().optional(),
  title: z.string().min(2, 'The title must contain at least 2 character(s)'),
  description: z
    .string()
    .min(2, 'The description must contain at least 2 character(s)'),
  task_type: z.literal('self_verify'),
  task_data: fileTaskDataSchema,
});

export const taskSnapshotSchema = z.object({
  id: z.string().optional(),
  task_id: z.string().optional(),
  title: z.string().min(2, 'The title must contain at least 2 character(s)'),
  description: z
    .string()
    .min(2, 'The description must contain at least 2 character(s)'),
  task_type: z.literal('snapshot'),
  task_data: snapshotTaskDataSchema,
});

export const createGateSchema = z.object({
  title: z.string().min(2, 'The title must contain at least 2 character(s)'),
  categories: z.array(z.string()).min(1, 'Please select at least 1 category'),
  description: z
    .string()
    .min(2, 'The description must contain at least 2 character(s)'),
  image: z.string({ required_error: 'Image is required' }).min(2),
  skills: z.array(z.string()).min(1, 'Please select at least 1 skill'),
  created_by: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
  tasks: z.object({
    data: z
      .array(
        z.discriminatedUnion('task_type', [
          taskSelfVerifySchema,
          taskMeetingCodeSchema,
          taskQuizSchema,
          taskSnapshotSchema,
          taskHoldTokenSchema,
        ])
      )
      .nonempty({ message: 'A gate needs to have at least one task.' }),
  }),
});
