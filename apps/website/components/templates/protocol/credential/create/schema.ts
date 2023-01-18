import { z } from 'zod';

export type CreateCredentialData = {
  id?: string;
  title?: string;
  description?: string;
  categories: string[];
  expire_date?: string;
  skills: string[];
} & Required<
  Pick<any, 'title' | 'description' | 'categories' | 'expire_date' | 'skills'>
>;

export const createCredentialSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(2, 'The title must contain at least 2 character(s)'),
  description: z
    .string({ required_error: 'Description is required' })
    .min(2, 'The description must contain at least 2 character(s)'),
  categories: z
    .array(z.string({ required_error: 'Categories is required' }), {
      invalid_type_error: 'Categories is required',
    })
    .min(1, 'Please select at least 1 category'),
  expire_date: z.string().nullish(),
  skills: z
    .array(z.string({ required_error: 'Skills is required' }), {
      invalid_type_error: 'Skills is required',
    })
    .min(1, 'Please select at least 1 skill'),
  creator: z.object({
    id: z.string(),
    name: z.string(),
  }),
});
