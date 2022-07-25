import { PartialDeep } from 'type-fest';
import { object, string, SchemaOf, array } from 'yup';

import { generateImageUrl } from '../../../hooks/use-file';
import { Daos, Dao_Socials } from '../../../services/graphql/types.generated';

export type NewDAOSchema = Required<
  PartialDeep<Pick<Daos, 'name' | 'description' | 'categories'>>
> & {
  socials: Pick<Dao_Socials, 'network' | 'url'>[];
  background: string;
  logo: string;
};

export const defaultValues = (
  dao?: PartialDeep<Daos>
): NewDAOSchema | undefined => {
  if (!dao) return undefined;

  const { name, description, categories, socials, background, logo } = dao;

  return {
    name,
    description,
    categories,
    socials: socials.map(({ network, url }) => ({ network, url })),
    background: generateImageUrl(background?.id),
    logo: generateImageUrl(logo?.id),
  };
};

export const schema: SchemaOf<NewDAOSchema> = object({
  name: string().defined(),
  categories: array().of(string()).min(1).defined(),
  description: string().defined(),
  background: string().defined(),
  logo: string().defined(),
  socials: array().of(
    object({
      network: string().defined(),
      url: string().url().defined(),
    })
  ),
});
