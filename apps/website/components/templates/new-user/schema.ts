import { PartialDeep } from 'type-fest';
import { object, string, SchemaOf } from 'yup';

import { Users } from '../../../services/graphql/types.generated';

export type NewUserSchema = Required<
  Pick<Users, 'name' | 'username' | 'pfp' | 'email_address'>
>;

const usernameRegex = /^(?=[a-z0-9_-]{8,20}$)(?!.*[_-]{2})[^_-].*[^_-]$/;

// 'Username can only have lowercase alphanumeric charaters and ._-'
export const schema: SchemaOf<NewUserSchema> = object({
  name: string().min(2).max(50).defined(),
  pfp: string().min(2).defined(),
  username: string()
    .min(2)
    .max(20)
    .test({
      name: 'username',
      message: 'Username can only have lowercase alphanumeric charaters and _-',
      test: (value) => usernameRegex.test(value),
    })
    .defined(),
  email_address: string().min(2).email().defined(),
});

export const defaultValues = ({
  name,
  username,
  pfp,
  email_address,
}: PartialDeep<Users>): NewUserSchema => ({
  name,
  username,
  pfp,
  email_address,
});
