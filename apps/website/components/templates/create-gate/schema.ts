import { object, string, array, SchemaOf } from 'yup';

// Files & Links
type FileTaskTypes = {
  title: string;
  description: string;
  files: FileTypes[];
};

type FileTypes = {
  title: string;
  description: string;
  link: string;
};

// Create Gate
export type CreateGateTypes = {
  title: string;
  categories: string[];
  description: string;
  image: string;
  skills: string[];
  created_by: string[];
  tasks: FileTaskTypes[];
};

export const createGateSchema: SchemaOf<CreateGateTypes> = object({
  title: string().min(2).defined(),
  categories: array().of(string()).defined(),
  description: string().min(2).defined(),
  image: string().min(2).defined(),
  skills: array().of(string()).defined(),
  created_by: array().of(string()).defined(),
  tasks: array()
    .of(
      object({
        title: string().min(2).defined(),
        description: string().min(2).defined(),
        files: array()
          .of(
            object({
              title: string().min(2).defined(),
              description: string().min(2).defined(),
              link: string().min(2).defined(),
            })
          )
          .defined(),
      })
    )
    .defined(),
});
