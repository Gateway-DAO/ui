import { object, string, array, SchemaOf } from 'yup';

import { gqlAnonMethods } from '../../../../services/hasura/api';

export type NameSchema = Required<Pick<any, 'name'>>;
export type GatewayIdSchema = Required<Pick<any, 'gatewayId'>>;
export type CategoriesSchema = Required<Pick<any, 'categories'>>;
export type AboutSchema = Required<Pick<any, 'about'>>;
export type WebsiteSchema = Required<Pick<any, 'website'>>;
export type EmailSchema = Required<Pick<any, 'email'>>;
export type RoleSchema = Required<Pick<any, 'role'>>;
export type TwitterSchema = Required<Pick<any, 'twitter'>>;
export type TelegramSchema = Required<Pick<any, 'telegram'>>;

const gatewayIdRegex = /^(?=[a-z0-9._]{2,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

export const nameSchema: SchemaOf<NameSchema> = object({
  name: string().required('Name is required').min(3),
});

export const gatewayIdSchema: SchemaOf<GatewayIdSchema> = object({
  gatewayId: string()
    .min(2)
    .max(20)
    .test({
      name: 'username',
      message: 'Only lowercase letters, numbers and ._-',
      test: (value) => gatewayIdRegex.test(value),
    })
    .test('checkGatewayId', 'This ID is already being used', async (value) => {
      if (value.length > 2) {
        const response = await gqlAnonMethods.check_org_by_gateway_id({
          gatewayId: value,
        });
        return response.daos.length === 0;
      }
      return true;
    })
    .defined(),
});

export const categoriesSchema: SchemaOf<CategoriesSchema> = object({
  categories: array(string())
    .min(1, 'Please select at least 1 category')
    .required('Categories is required'),
});

export const aboutSchema: SchemaOf<AboutSchema> = object({
  about: string().required('About is required'),
});

export const websiteSchema: SchemaOf<WebsiteSchema> = object({
  website: string().url().required('URL is required'),
});

export const emailSchema: SchemaOf<EmailSchema> = object({
  email: string().email('Invalid email address').required('Email is required'),
});

export const roleSchema: SchemaOf<RoleSchema> = object({
  role: string().required('Role is required'),
});

export const twitterSchema: SchemaOf<TwitterSchema> = object({
  twitter: string().required('Twitter is required'),
});

export const telegramSchema: SchemaOf<TelegramSchema> = object({
  telegram: string(),
});
