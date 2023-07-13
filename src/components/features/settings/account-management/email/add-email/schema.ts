import { Users } from '@/services/hasura/types';
import { object, string, SchemaOf } from 'yup';

export type EmailSchema = Required<Pick<Users, 'email_address'>>;

export type TokenConfirmationSchema = {
  code: string;
};

export const schemaEmail: SchemaOf<EmailSchema> = object({
  email_address: string().min(2).email().defined().label('Email address'),
});

export const schemaTokenConfirmation: SchemaOf<TokenConfirmationSchema> =
  object({
    code: string().min(6, 'Invalid code').max(6, 'Invalid code').label('Code'),
  });
