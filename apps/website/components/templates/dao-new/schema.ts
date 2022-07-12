import { PartialDeep } from 'type-fest';
import { object, string, SchemaOf, array } from 'yup';

import { Daos, Dao_Socials } from '../../../services/graphql/types.generated';

export type NewDAOSchema = Required<
  PartialDeep<
    Pick<
      Daos,
      'name' | 'description' | 'categories' | 'background_url' | 'logo_url'
    >
  >
> & {
  socials: Pick<Dao_Socials, 'network' | 'url'>[];
};

export const schema: SchemaOf<NewDAOSchema> = object({
  name: string().defined(),
  categories: array().of(string()).defined(),
  description: string().defined(),
  background_url: string().defined(),
  logo_url: string().defined(),
  socials: array().of(
    object({
      network: string().defined(),
      url: string().url().defined(),
    })
  ),
});
