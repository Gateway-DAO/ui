import { object, string, SchemaOf } from 'yup';

type SendEmail = {
  email: string;
};

type ConfirmToken = {
  code: string;
};

export type SendEmailSchema = Required<Pick<SendEmail, 'email'>>;
export type TokenConfirmationSchema = Required<Pick<ConfirmToken, 'code'>>;

export const schemaSendEmail: SchemaOf<SendEmailSchema> = object({
  email: string().min(2).email().defined(),
});

export const schemaTokenConfirmation: SchemaOf<TokenConfirmationSchema> =
  object({
    code: string().required(),
  });
