import { object, string, SchemaOf } from 'yup';

import { Users } from '../../../types/graphql';

export type NewUserSchema = Pick<Users, 'name' | 'username'> & {
  email: string;
};

export const schema: SchemaOf<NewUserSchema> = object({
  name: string().defined(),
  // pfp: string().defined(),
  username: string().defined(),
  email: string().email().defined(),
});
