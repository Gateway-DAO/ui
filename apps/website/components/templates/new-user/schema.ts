import { PartialDeep } from 'type-fest';
import { object, string, SchemaOf } from 'yup';

import { Users } from '../../../services/hasura/types';

export type NewUserSchema = Required<Pick<Users, 'username' | 'email_address'>>;
export type TokenConfirmationSchema = Required<Pick<any, 'token'>>;

const usernameRegex = /^(?=[a-z0-9._]{2,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

export const schemaCreateAccount: SchemaOf<NewUserSchema> = object({
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

export const schemaTokenConfirmation: SchemaOf<TokenConfirmationSchema> =
  object({
    token: string().max(6, 'Invalid code'),
  });

export const defaultValuesCreateAccount = ({
  username,
  email_address,
}: PartialDeep<Users>): NewUserSchema => ({
  username,
  email_address,
});
