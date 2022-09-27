export type AuthStep =
  | 'unauthenticated'
  | 'get-nonce'
  | 'send-signature'
  | 'get-me'
  | 'error'
  | 'authenticated';

export type AuthStepError = {
  message: any;
  label: string;
};
