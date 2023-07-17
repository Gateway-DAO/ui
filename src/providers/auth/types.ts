export type WalletModalStep =
  | 'unauthenticated'
  | 'get-nonce'
  | 'send-signature'
  | 'get-me'
  | 'add-wallet'
  | 'error'
  | 'authenticated';

export type WalletModalStepError = {
  message: any;
  label: string;
};
