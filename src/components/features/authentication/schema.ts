import { Users } from '@/services/hasura/types';
import { object, string, SchemaOf } from 'yup';

export type EmailSchema = Required<Pick<Users, 'id' | 'email_address'>>;
export type GatewayIdSchema = Required<Pick<Users, 'id' | 'username'>>;
export type TokenConfirmationSchema = Required<Pick<any, 'token'>>;

const usernameRegex = /^(?=[a-z0-9._]{2,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

export const schemaEmail: SchemaOf<EmailSchema> = object({
  id: string(),
  email_address: string().min(2).email().defined(),
});

export const schemaTokenConfirmation: SchemaOf<TokenConfirmationSchema> =
  object({
    token: string().max(6, 'Invalid code'),
  });

export const schemaGatewayId: SchemaOf<GatewayIdSchema> = object({
  id: string(),
  username: string()
    .min(2)
    .max(20)
    .test({
      name: 'username',
      message: 'Only lowercase letters, numbers and ._-',
      test: (value) => usernameRegex.test(value),
    })
    .defined(),
});
