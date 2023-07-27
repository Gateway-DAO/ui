import { Files, Gates } from '@/services/hasura/types';
import { isAddress } from 'ethers/lib/utils';
import { FieldError } from 'react-hook-form';
import { z } from 'zod';

// Creator
export type Creator = {
  id: string;
  username?: string;
};

// Draft Gate
export type CreateGateData = {
  id?: string;
  daoId?: string;
  categories: string[];
  expire_date?: string;
  claim_limit?: number;
  data_model_id?: string;
  loyalty_id?: string;
  points?: number;
  schema?: any;
  claim?: any;
} & Required<Pick<Gates, 'title' | 'categories' | 'image' | 'description'>> &
  Required<{ creator: Pick<Gates['creator'], 'id'> }> & {
    type: 'task_based' | 'direct';
    whitelisted_wallets_file?: Partial<Files>;
    isFalid?: boolean;
    tasks?: Task[];
  };

export type GateType = CreateGateData['type'];

// Task
export type SelfVerifyTask = {
  task_type: 'self_verify';
  task_data: FileTaskData;
};

export type ManualTask = {
  task_type: 'manual';
  task_data: ManualTaskData;
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

export type HoldNFTTask = {
  task_type: 'nft_hold';
  task_data: HoldNFTData;
};

export type TrackOnChainEventsTask = {
  task_type: 'track_onchain';
  task_data: TrackOnChainEventsData;
};

export type FollowProfileTask = {
  task_type: 'twitter_follow';
  task_data: TwitterFollowData;
};

export type TwitterTweetTask = {
  task_type: 'twitter_tweet';
  task_data: TwitterTweetData;
};

export type TwitterRetweetTask = {
  task_type: 'twitter_retweet';
  task_data: TwitterRetweetData;
};

export type TwitterLikeTask = {
  task_type: 'twitter_like';
  task_data: TwitterLikeData;
};

export type GithubContributeTask = {
  task_type: 'github_contribute';
  task_data: GithubContributeData;
};

export type GithubPRTask = {
  task_type: 'github_prs';
  task_data: GithubPRData;
};

export type Task = {
  id?: string;
  gate_id?: string;
  task_id?: string;
  title: string;
  description: string;
  order: number;
} & (
  | SelfVerifyTask
  | MeetingCodeTask
  | QuizTask
  | SnapshotTask
  | HoldTokenTask
  | HoldNFTTask
  | TrackOnChainEventsTask
  | FollowProfileTask
  | TwitterTweetTask
  | TwitterLikeTask
  | TwitterRetweetTask
  | GithubContributeTask
  | GithubPRTask
  | ManualTask
);

// Verification Code
export type VerificationCodeData = {
  code?: string;
};

export type VerificationCodeDataError = {
  id?: FieldError;
  code?: FieldError;
};

// Twitter follow
export type TwitterFollowData = {
  username?: string;
};

export type TwitterFollowDataError = {
  id?: FieldError;
  username?: FieldError;
};

// Twitter Tweet
export type TwitterTweetData = {
  tweet_text?: string;
};

export type TwitterTweetDataError = {
  id?: FieldError;
  tweet_text?: FieldError;
};

// Twitter Retweet
export type TwitterRetweetData = {
  tweet_link?: string;
};

export type TwitterLikeData = {
  tweet_link?: string;
};

export type TwitterRetweetDataError = {
  id?: FieldError;
  tweet_link?: FieldError;
};

export type TwitterLikeDataError = {
  id?: FieldError;
  tweet_link?: FieldError;
};

// Github Contribute
export type GithubContributeData = {
  repository_link?: string;
};

export type GithubContributeDataError = {
  id?: FieldError;
  repository_link?: FieldError;
};

// Github PR
export type GithubPRData = {
  repository_link?: string;
  requested_pr_amount?: number;
};

export type GithubPRDataError = {
  id?: FieldError;
  repository_link?: FieldError;
  requested_pr_amount?: FieldError;
};

// Quiz
export type QuizTaskData = {
  questions?: Question[];
  pass_score?: number;
  time_period?: number;
  attempt_limit?: number | null;
};

export type QuizTaskDataError = {
  id?: FieldError;
  pass_score?: FieldError;
  time_period?: FieldError;
  attempt_limit?: FieldError;
  questions?: {
    id?: FieldError;
    question?: FieldError;
    type?: FieldError;
    options?: {
      id?: FieldError;
      value?: FieldError;
      correct?: FieldError;
      order?: FieldError;
    }[] &
      FieldError;
  }[];
};

export type TrackOnChainEventsDataError = {
  id?: FieldError;
  chain?: FieldError;
  contract_address?: FieldError;
  parameters?: {
    id?: FieldError;
    type: FieldError;
    operator: FieldError;
    value: FieldError;
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
  order: number;
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

export type TrackOnChainEventsData = {
  chain?: string;
  contract_address?: string;
  parameters: Parameter[];
};

export type Parameter = {
  id?: string;
  type: string;
  operator: string;
  value: any;
};

export type HoldTokenDataError = {
  id?: FieldError;
  chain?: FieldError;
  token_address?: FieldError;
  quantity?: FieldError;
};

// Hold NFT
export type HoldNFTData = {
  chain?: string;
  nft_address?: string;
};

export type HoldNFTDataError = {
  id?: FieldError;
  chain?: FieldError;
  nft_address?: FieldError;
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

// Manual
export type ManualTaskData = {
  id?: string;
  event_type?: string;
};

export type ManualTaskDataError = {
  id?: FieldError;
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

const twitterFollowDataSchema = z.object({
  username: z
    .string()
    .min(2, 'The username must contain at least 2 character(s)'),
});

const twitterTweetTaskDataSchema = z.object({
  tweet_text: z
    .string()
    .min(3, 'The tweet text must contain at least 3 character(s)')
    .max(280, 'The tweet text must contain until 280 character(s)'),
});

const twitterRetweetTaskDataSchema = z.object({
  tweet_link: z
    .string()
    .url('Invalid URL')
    .refine((val) => val.includes('twitter.com'), {
      message: 'This is not a Twitter URL',
    }),
});

const twitterLikeTaskDataSchema = z.object({
  tweet_link: z
    .string()
    .url('Invalid URL')
    .refine((val) => val.includes('twitter.com'), {
      message: 'This is not a Twitter URL',
    }),
});

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
    .refine(isAddress, { message: 'This is not a valid contract address' }),
  quantity: z.number({
    invalid_type_error: 'Quantity must be a number',
    required_error: "Quantity can't be empty",
  }),
});

const trackOnChainTaskDataSchema = z.object({
  chain: z.number(),
  parameters: z.array(
    z.object({
      type: z.string(),
      operator: z
        .enum(['equal_to', 'not_equal_to', 'greater_than', 'less_than'])
        .optional(),
      value: z.any(),
    })
  ),
  contract_address: z
    .string()
    .refine(isAddress, { message: 'This is not a valid contract address' }),
});

const holdNFTTaskDataSchema = z.object({
  chain: z.number(),
  nft_address: z
    .string()
    .min(2, 'The NFT contract address must contain at least 2 character(s)')
    .length(42, 'The NFT contract address must contain exactly 42 character(s)')
    .refine((val) => val.startsWith('0x'), {
      message: 'This is not a valid NFT contract address',
    }),
});

export const verificationCodeDataSchema = z.object({
  code: z
    .string()
    .min(2, 'Verification code must contain at least 2 character(s)'),
});

export const githubContributeDataSchema = z.object({
  repository_link: z
    .string()
    .url()
    .regex(RegExp('https://github.com/(.+)/(.+)'), {
      message: 'This is not a valid Github repository link',
    }),
});

export const githubPRDataSchema = z.object({
  repository_link: z
    .string()
    .url()
    .regex(RegExp('https://github.com/(.+)/(.+)'), {
      message: 'This is not a valid Github repository link',
    }),
  requested_pr_amount: z.number({
    invalid_type_error: 'Requested PR amount must be a number',
    required_error: "Requested PR amount can't be empty",
  }),
});

export const taskMeetingCodeSchema = z.object({
  id: z.string().optional(),
  task_id: z.string().optional(),
  order: z.number().optional(),
  title: z.string().min(2, 'The title must contain at least 2 character(s)'),
  description: z
    .string()
    .min(2, 'The description must contain at least 2 character(s)'),
  task_type: z.literal('meeting_code'),
  task_data: verificationCodeDataSchema,
});

export const TwitterFollowProfileSchema = z.object({
  title: z.string().min(2, 'The title must contain at least 2 character(s)'),
  order: z.number().optional(),
  description: z
    .string()
    .min(2, 'The description must contain at least 2 character(s)'),
  task_type: z.literal('twitter_follow'),
  task_data: twitterFollowDataSchema,
});

export const quizDataSchema = z.object({
  pass_score: z.number().min(1).max(100),
  time_period: z.number({
    invalid_type_error: 'Select a time period',
    required_error: 'Select a time period',
  }),
  attempt_limit: z
    .number()
    .positive({ message: 'please enter a valid value' })
    .int({ message: `please enter a valid value , don't use decimal value` })
    .nullish(),
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
            order: z.number(),
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
  order: z.number().optional(),
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
  order: z.number().optional(),
  title: z
    .string()
    .min(2, 'Hold Token title must contain at least 2 character(s)'),
  description: z
    .string()
    .min(2, 'The description must contain at least 2 character(s)'),
  task_type: z.literal('token_hold'),
  task_data: holdTokenTaskDataSchema,
});

export const taskTrackOnChainSchema = z.object({
  id: z.string().optional(),
  task_id: z.string().optional(),
  order: z.number().optional(),
  title: z
    .string()
    .min(2, 'Hold Token title must contain at least 2 character(s)'),
  description: z
    .string()
    .min(2, 'The description must contain at least 2 character(s)'),
  task_type: z.literal('track_onchain'),
  task_data: trackOnChainTaskDataSchema,
});

export const taskHoldNFTSchema = z.object({
  id: z.string().optional(),
  task_id: z.string().optional(),
  title: z
    .string()
    .min(2, 'Hold NFT title must contain at least 2 character(s)'),
  description: z
    .string()
    .min(2, 'The description must contain at least 2 character(s)'),
  task_type: z.literal('nft_hold'),
  task_data: holdNFTTaskDataSchema,
});

export const taskSelfVerifySchema = z.object({
  id: z.string().optional(),
  task_id: z.string().optional(),
  order: z.number().optional(),
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
  order: z.number().optional(),
  title: z.string().min(2, 'The title must contain at least 2 character(s)'),
  description: z
    .string()
    .min(2, 'The description must contain at least 2 character(s)'),
  task_type: z.literal('snapshot'),
  task_data: snapshotTaskDataSchema,
});

export const taskTwitterTweetSchema = z.object({
  id: z.string().optional(),
  task_id: z.string().optional(),
  order: z.number().optional(),
  title: z.string().min(2, 'The title must contain at least 2 character(s)'),
  description: z
    .string()
    .min(2, 'The description must contain at least 2 character(s)'),
  task_type: z.literal('twitter_tweet'),
  task_data: twitterTweetTaskDataSchema,
});

export const taskTwitterRetweetSchema = z.object({
  id: z.string().optional(),
  task_id: z.string().optional(),
  order: z.number().optional(),
  title: z.string().min(2, 'The title must contain at least 2 character(s)'),
  description: z
    .string()
    .min(2, 'The description must contain at least 2 character(s)'),
  task_type: z.literal('twitter_retweet'),
  task_data: twitterRetweetTaskDataSchema,
});

export const taskTwitterLikeSchema = z.object({
  id: z.string().optional(),
  task_id: z.string().optional(),
  order: z.number().optional(),
  title: z.string().min(2, 'The title must contain at least 2 character(s)'),
  description: z
    .string()
    .min(2, 'The description must contain at least 2 character(s)'),
  task_type: z.literal('twitter_like'),
  task_data: twitterLikeTaskDataSchema,
});

export const taskGithubContributeSchema = z.object({
  id: z.string().optional(),
  task_id: z.string().optional(),
  order: z.number().optional(),
  title: z.string().min(2, 'The title must contain at least 2 character(s)'),
  description: z
    .string()
    .min(2, 'The description must contain at least 2 character(s)'),
  task_type: z.literal('github_contribute'),
  task_data: githubContributeDataSchema,
});

export const taskGithubPRSchema = z.object({
  id: z.string().optional(),
  task_id: z.string().optional(),
  order: z.number().optional(),
  title: z.string().min(2, 'The title must contain at least 2 character(s)'),
  description: z
    .string()
    .min(2, 'The description must contain at least 2 character(s)'),
  task_type: z.literal('github_prs'),
  task_data: githubPRDataSchema,
});

export const taskManualSchema = z.object({
  id: z.string().optional(),
  task_id: z.string().optional(),
  order: z.number().optional(),
  title: z.string().min(2, 'The title must contain at least 2 character(s)'),
  description: z
    .string()
    .min(2, 'The description must contain at least 2 character(s)'),
  task_data: z.object({ event_type: z.enum(['comment', 'send_link']) }),
  task_type: z.literal('manual'),
});

export const addRecipientDirectCredentialSchema = z.object({
  type: z.string(),
  value: z.string().min(2, 'The value must contain at least 2 character(s)'),
  addNew: z.boolean().default(false),
  oldType: z.string(),
  oldWallet: z.string(),
});

const gateBase = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(2, 'The title must contain at least 2 character(s)'),
  categories: z
    .array(z.string({ required_error: 'Categories is required' }), {
      invalid_type_error: 'Categories is required',
    })
    .min(1, 'Please select at least 1 category'),
  description: z
    .string({ required_error: 'Description is required' })
    .min(2, 'The description must contain at least 2 character(s)'),
  image: z.string({ required_error: 'Image is required' }).min(2),
  creator: z.object({
    id: z.string(),
    username: z.string().optional(),
  }),
  claim_limit: z
    .number()
    .positive({ message: 'please enter a valid value' })
    .int({ message: `please enter a valid value , don't use decimal value` })
    .nullish(),
  expire_date: z.string().nullish(),
  data_model_id: z.string(),
  loyalty_id: z.string().nullish(),
  schema: z.any().nullish(),
  claim: z.any().nullish(),
  points: z
    .number()
    .positive({ message: 'please enter a valid value' })
    .int({ message: `please enter a valid value , don't use decimal value` })
    .nullish(),
});

const taskGate = gateBase.augment({
  type: z.literal('task_based' as GateType),
  tasks: z
    .array(
      z.discriminatedUnion('task_type', [
        taskSelfVerifySchema,
        taskMeetingCodeSchema,
        taskQuizSchema,
        taskSnapshotSchema,
        taskHoldTokenSchema,
        taskTrackOnChainSchema,
        taskHoldNFTSchema,
        TwitterFollowProfileSchema,
        taskTwitterTweetSchema,
        taskTwitterLikeSchema,
        taskTwitterRetweetSchema,
        taskGithubContributeSchema,
        taskGithubPRSchema,
        taskManualSchema,
      ])
    )
    .nonempty({ message: 'A credential needs to have at least one task.' }),
});

const directGate = gateBase.augment({
  type: z.literal('direct' as GateType),
  whitelisted_wallets_file: z
    .object({
      id: z.string(),
    })
    .nullish(),
});

export const createGateSchema = z.discriminatedUnion('type', [
  taskGate,
  directGate,
]);
