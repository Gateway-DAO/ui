import { object, string, SchemaOf } from 'yup';

import { Credentials } from '../../../services/graphql/types.generated';

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
