export type WalletAuthStep =
  | 'unauthenticated'
  | 'get-nonce'
  | 'send-signature'
  | 'get-me'
  | 'error'
  | 'authenticated';

export type WalletAuthStepError = {
  message: any;
  label: string;
};
