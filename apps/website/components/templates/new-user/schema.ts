import { object, string, SchemaOf } from 'yup';

import { SessionUser } from '../../../types/user';

export type NewUserSchema = Required<
  Pick<SessionUser, 'name' | 'username' | 'pfp' | 'email_address'>
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
}: Partial<SessionUser>): NewUserSchema => ({
  name,
  username,
  pfp,
  email_address,
});
