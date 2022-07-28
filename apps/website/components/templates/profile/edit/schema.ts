import { PartialDeep } from 'type-fest';
import { object, string, SchemaOf, array, mixed, bool } from 'yup';

import { generateImageUrl } from '../../../../hooks/use-file';
import {
  Experiences,
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
  // experiences: PartialDeep<Experiences>[];
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
    // experiences,
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
    // experiences: experiences || [],
    cover: generateImageUrl(cover?.id),
    picture: generateImageUrl(picture?.id),
  };
};

export const schema: SchemaOf<EditUserSchema> = object({
  name: string().required('Name is required'),
  bio: string().optional(),
  username: string().required('Username is required'),
  cover: string().optional(),
  skills: array().of(string()).optional(),
  languages: array().of(string()).optional(),
  timezone: string().optional(),
  picture: string().optional(),
  socials: array()
    .of(
      object({
        network: string().required('Network is required'),
        url: string()
          .url('The URL should be valid')
          .required('URL is required'),
      })
    )
    .optional(),
  // experiences: array().of(mixed<PartialDeep<Experiences>>()).defined(),
});
