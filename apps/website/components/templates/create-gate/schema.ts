import { object, string, array, SchemaOf } from 'yup';

export type CreateGateTypes = {
  title: string;
  categories: string[];
  description: string;
  image: string;
  admin: string;
  knowledge: string[];
};

export const createGateSchema: SchemaOf<CreateGateTypes> = object({
  title: string().min(2).defined(),
  categories: array().of(string()).defined(),
  description: string().min(2).defined(),
  image: string().min(2).defined(),
  admin: string().min(2).defined(),
  knowledge: array().of(string()).defined(),
});
