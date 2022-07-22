import { PartialDeep } from 'type-fest';
import { object, string, SchemaOf, array } from 'yup';

import { generateImageUrl } from '../../../../hooks/use-file';
import {
  Users,
  User_Socials,
} from '../../../../services/graphql/types.generated';
import { SessionUser } from '../../../../types/user';

export type EditUserSchema = Required<
  PartialDeep<
    Pick<
      Users,
      'name' | 'bio' | 'username' | 'skills' | 'languages' | 'timezone'
    >
  >
> & {
  socials: Pick<User_Socials, 'network' | 'url'>[];
  cover: string;
  picture: string;
};

export const defaultValues = (
  user?: PartialDeep<Users> | SessionUser
): EditUserSchema | undefined => {
  if (!user) return undefined;

  const {
    name,
    bio,
    username,
    skills,
    languages,
    timezone,
    socials,
    cover,
    picture,
  } = user;

  return {
    name,
    bio,
    username,
    skills: skills || [],
    languages: languages || [],
    timezone,
    socials: socials?.map(({ network, url }) => ({ network, url })) || [],
    cover: generateImageUrl(cover?.id),
    picture: generateImageUrl(picture?.id),
  };
};

export const schema: SchemaOf<EditUserSchema> = object({
  name: string().defined(),
  bio: string().defined(),
  username: string().defined(),
  cover: string(),
  skills: array().of(string()).defined(),
  languages: array().of(string()).defined(),
  timezone: string().defined(),
  picture: string(),
  socials: array().of(
    object({
      network: string().defined(),
      url: string().url().defined(),
    })
  ),
});
