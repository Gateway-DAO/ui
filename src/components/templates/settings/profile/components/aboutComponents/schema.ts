import { Users } from '@/services/hasura/types';
import { object, string, SchemaOf } from 'yup';

export type ProfileSchema = Pick<Users, 'name' | 'username'>;

export const schema: SchemaOf<ProfileSchema> = object({
  name: string().min(2).defined(),
  username: string().min(2).defined(),
});

export const defaultValues = ({
  name,
  username,
}: Partial<Users>): ProfileSchema => ({ name, username });
