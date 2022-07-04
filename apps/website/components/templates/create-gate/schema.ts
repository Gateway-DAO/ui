import { object, string, array, SchemaOf } from 'yup';

export type CreateGateTypes = {
  title: string;
  categories: string[];
  description: string;
  image: string;
  created_by: string;
  skills: string[];
};

export const createGateSchema: SchemaOf<CreateGateTypes> = object({
  title: string().min(2).defined(),
  categories: array().of(string()).defined(),
  description: string().min(2).defined(),
  image: string().min(2).defined(),
  created_by: string().min(2).defined(),
  skills: array().of(string()).defined(),
});
