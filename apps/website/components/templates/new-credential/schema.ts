import { object, string, SchemaOf, array } from 'yup';

import { Credentials } from '../../../types/graphql';

export type NewCredentialSchema = Pick<Credentials, 'name' | 'description'> & {
  category: string;
  wallets: string;
};

export const schema: SchemaOf<NewCredentialSchema> = object({
  name: string().defined(),
  category: string().defined(),
  description: string().defined(),
  wallets: string().defined(),
});
