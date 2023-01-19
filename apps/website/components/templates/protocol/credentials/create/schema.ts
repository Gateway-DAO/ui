import { z } from 'zod';

export type CreateCredentialData = {
  title: string;
  description: string;
  evidences?: any[];
  claim?: any;
  issuanceDate?: string;
  expirationDate?: string;
  status?: string;
  image?: string;
  tags?: string[];
} & Required<Pick<any, 'title' | 'description'>>;

export const createCredentialSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(2, 'The title must contain at least 2 character(s)'),
  description: z
    .string({ required_error: 'Description is required' })
    .min(2, 'The description must contain at least 2 character(s)'),
  issuanceDate: z.string().nullish(),
  expirationDate: z.string().nullish(),
  tags: z.array(z.string()).optional(),
  status: z.string().optional(),
  image: z.string().optional(),
});
