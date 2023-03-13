import { z } from 'zod';

export type emailProps = {
  emailAddress: string;
  code: string;
};

export const emailSchema = z.object({
  email: z.string().email(),
  code: z
    .string({ required_error: 'Code is required' })
    .min(1, { message: 'Code is required' }),
});
