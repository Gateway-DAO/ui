import { object, string, SchemaOf } from 'yup';

import { Users } from '../../../services/graphql/types.generated';

export type NewUserSchema = Pick<
  Users,
  'name' | 'username' | 'pfp' | 'email_address'
>;

export const schema: SchemaOf<NewUserSchema> = object({
  name: string().min(2).defined(),
  pfp: string().min(2).defined(),
  username: string().min(2).defined(),
  email_address: string().min(2).email().defined(),
});

export const defaultValues = ({
  name,
  username,
  pfp,
  email_address,
}: Partial<Users>): NewUserSchema => ({ name, username, pfp, email_address });
