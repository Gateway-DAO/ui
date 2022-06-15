import { object, string, SchemaOf } from 'yup';

import { Users } from '../../../services/graphql/types.generated';

export type NewUserSchema = Pick<
  Users,
  'name' | 'about' | 'username' | 'pfp' | 'email_address' | 'discord_id'
>;

export const schema: SchemaOf<NewUserSchema> = object({
  name: string().min(2).defined(),
  about: string().min(2).defined(),
  pfp: string().min(2).defined(),
  username: string().min(2).defined(),
  email_address: string().min(2).email().defined(),
  discord_id: string().min(2).defined(),
});

export const defaultValues = ({
  name,
  about,
  username,
  pfp,
  email_address,
  discord_id,
}: Partial<Users>): NewUserSchema => ({
  name,
  about,
  username,
  pfp,
  email_address,
  discord_id,
});
