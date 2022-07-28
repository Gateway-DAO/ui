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
  bio: string().nullable(),
  username: string().required('Username is required'),
  cover: string().nullable(),
  skills: array().of(string()).default([]).optional(),
  languages: array().of(string()).default([]).optional(),
  timezone: string().nullable(),
  picture: string().nullable(),
  socials: array()
    .of(
      object({
        network: string().defined(),
        url: string()
          .matches(
            /((https|http):\/\/)(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'The URL should be valid'
          )
          .defined(),
      })
    )
    .nullable(),
  // experiences: array().of(mixed<PartialDeep<Experiences>>()).defined(),
});
