import { z } from 'zod';

export type AccountManagementProps = {
  emailAddress: string;
  code: string;
};

export const accountManagementSchema = z.object({
  email: z.string().email(),
  code: z.string(),
});
