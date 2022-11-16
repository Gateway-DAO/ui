export type UploadVerifyCSV = { id: string; total: number };
export type ProgressVerifyCSV = {
  id: string;
  total: number;
  valid: number;
  invalid: string[];
  isDone: boolean;
};
