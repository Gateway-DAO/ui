import { Users } from '@/services/hasura/types';
import { object, string, SchemaOf } from 'yup';

export type EmailSchema = Required<Pick<Users, 'email_address'>>;
export type GatewayIdSchema = {
  gatewayId: string;
};
export type TokenConfirmationSchema = {
  code: string;
};
export type AddEmailConfirmationSchema = {
  code: string;
  email: string;
};

const usernameRegex = /^(?=[a-z0-9._]{2,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

export const schemaEmail: SchemaOf<EmailSchema> = object({
  email_address: string().min(2).email().defined().label('Email address'),
});

export const schemaTokenConfirmation: SchemaOf<TokenConfirmationSchema> =
  object({
    code: string().min(6, 'Invalid code').max(6, 'Invalid code').label('Code'),
  });

export const schemaGatewayId: SchemaOf<GatewayIdSchema> = object({
  gatewayId: string()
    .min(2)
    .max(20)
    .test({
      name: 'Gateway Id',
      message: 'Only lowercase letters, numbers and ._-',
      test: (value) => usernameRegex.test(value),
    })
    .defined()
    .label('Gateway Id'),
});
