import { Network } from '@/constants/dao';
import { URL, DISCORD_USER, URL_PROTOCOL } from '@/constants/forms';
import { generateImageUrl } from '@/hooks/use-file';
import { Users, User_Socials } from '@/services/hasura/types';
import { SessionUser } from '@/types/user';
import normalizeUrl from 'normalize-url';
import { PartialDeep } from 'type-fest';
import { object, string, SchemaOf, array, StringSchema } from 'yup';

export type EditUserSchema = Required<
  PartialDeep<Pick<Users, 'name' | 'bio' | 'skills' | 'languages' | 'timezone'>>
> & {
  socials: Pick<User_Socials, 'network' | 'url'>[];
  cover: string;
  picture: string;
};

export const defaultValues = (
  user?: PartialDeep<Users> | SessionUser
): EditUserSchema | undefined => {
  if (!user) return undefined;

  const { name, bio, skills, languages, timezone, socials, cover, picture } =
    user;

  return {
    name,
    bio,
    skills: skills || [],
    languages: languages || [],
    timezone,
    socials: socials?.map(({ network, url }) => ({ network, url })) || [],
    cover: generateImageUrl(cover?.s3_key),
    picture: generateImageUrl(picture?.s3_key),
  };
};

export const schema: SchemaOf<EditUserSchema> = object({
  name: string().required('Name is required'),
  bio: string().nullable(),
  cover: string().nullable(),
  skills: array().of(string()).default([]).optional(),
  languages: array().of(string()).default([]).optional(),
  timezone: string().nullable(),
  picture: string().nullable(),
  socials: array()
    .of(
      object({
        network: string().defined('The field must be defined'),
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
                  .transform((val: string) => {
                    try {
                      return normalizeUrl(val, {
                        forceHttps: !URL_PROTOCOL.test(val),
                      });
                    } catch (e) {
                      return;
                    }
                  })
                  .defined('The field must be defined');
            }
          })
          .defined('The field must be defined'),
      })
    )
    .nullable(),
});
