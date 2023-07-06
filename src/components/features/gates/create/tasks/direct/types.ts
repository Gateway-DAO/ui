export type UploadVerifyCSV = { id: string; total: number };
export type ValidatedWallet = { wallet: string; ens?: string; type: string };
export type InvalidatedWallet = {
  wallet: string;
  type: string;
  invalid: true;
};
