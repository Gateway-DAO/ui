import { object, string, SchemaOf } from 'yup';

import { Users } from '../../../types/graphql';

export type NewUserForm = Pick<Users, 'name' | 'pfp' | 'username'> & {
  email: string;
};

export const schema: SchemaOf<NewUserForm> = object({
  name: string().defined(),
  pfp: string().defined(),
  username: string().defined(),
  email: string().email().defined(),
});
