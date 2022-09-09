import normalizeUrl from 'normalize-url';
import { PartialDeep } from 'type-fest';
import { object, string, SchemaOf, array, StringSchema, bool } from 'yup';

import { Network } from '../../../../constants/dao';
import { URL, DISCORD_USER, URL_PROTOCOL } from '../../../../constants/forms';
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

const usernameRegex = /^(?=[a-z0-9._]{2,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

export const schema: SchemaOf<EditUserSchema> = object({
  name: string().required('Name is required'),
  bio: string().nullable(),
  username: string()
    .required('Username is required')
    .min(2)
    .max(20)
    .test({
      name: 'username',
      message:
        'Username can only have lowercase alphanumeric charaters and ._-',
      test: (value) => usernameRegex.test(value),
    }),
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
          .when('network', (network: Network, schema: StringSchema) => {
            switch (network) {
              case 'email':
                return schema.email('Invalid email');
              case 'discord':
                return schema.matches(DISCORD_USER, 'Invalid Discord username');
              default:
                return schema
                  .matches(URL, 'The URL should be valid')
                  .transform((val: string) =>
                    normalizeUrl(val, { forceHttps: !URL_PROTOCOL.test(val) })
                  );
            }
          })
          .defined(),
      })
    )
    .nullable(),
  // experiences: array().of(mixed<PartialDeep<Experiences>>()).defined(),
});
