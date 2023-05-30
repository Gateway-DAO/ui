import { z } from 'zod';

export type FooterProps = {
  copyright: string;
  subscribe: string;
  receiveNews: string;
  subscribeButton: string;
  successMessage: string;
};

export const subscribeToNewsletterSchema = z.object({
  email: z.string().email(),
});
