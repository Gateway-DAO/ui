export type UploadVerifyCSV = { id: string; total: number };
export type ProgressVerifyCSV = {
  isDone: boolean;
  id: string;
  total: number;
  valid: number;
  invalid: number;
  validList: string[];
  uploadedTime: number;
  invalidList: string[];
};
export type ValidatedWallet = { wallet: string; ens?: string };
