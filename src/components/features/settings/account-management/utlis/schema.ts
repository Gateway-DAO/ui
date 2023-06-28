import { PartialDeep } from 'type-fest';
import { Users } from '@/services/hasura/types';
import { object, string, SchemaOf } from 'yup';
import { SessionUser } from '@/types/user';

export type UpdateGatewayId = Required<PartialDeep<Pick<Users, 'username'>>>;

const usernameRegex = /^(?=[a-z0-9._]{2,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

export const GatewayIdSchema: SchemaOf<UpdateGatewayId> = object({
  username: string()
    .min(2)
    .max(20)
    .test({
      name: 'username',
      message: 'Only lowercase letters, numbers and ._-',
      test: (value) => usernameRegex.test(value),
    })
    .defined(),
});

export const defaultValues = (
  user?: PartialDeep<Users> | SessionUser
): UpdateGatewayId | undefined => {
  if (!user) return undefined;
  const { username } = user;
  return {
    username,
  };
};
