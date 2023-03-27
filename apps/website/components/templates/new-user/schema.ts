import { PartialDeep } from 'type-fest';
import { object, string, SchemaOf } from 'yup';

import { Users } from '../../../services/hasura/types';

export type NewUserSchema = Required<
  Pick<Users, 'username' | 'pfp' | 'email_address'>
>;

const usernameRegex = /^(?=[a-z0-9._]{2,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

// 'Username can only have lowercase alphanumeric charaters and ._-'
export const schema: SchemaOf<NewUserSchema> = object({
  pfp: string().min(2),
  username: string()
    .min(2)
    .max(20)
    .test({
      name: 'username',
      message: 'Only lowercase letters, numbers and ._-',
      test: (value) => usernameRegex.test(value),
    })
    .defined(),
  email_address: string().min(2).email().defined(),
});

export const defaultValues = ({
  username,
  pfp,
  email_address,
}: PartialDeep<Users>): NewUserSchema => ({
  username,
  pfp,
  email_address,
});
