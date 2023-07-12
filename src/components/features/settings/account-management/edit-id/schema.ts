import { Protocol_User, Users } from '@/services/hasura/types';
import { SessionUser } from '@/types/user';
import { PartialDeep } from 'type-fest';
import { object, string, SchemaOf } from 'yup';

export type UpdateGatewayId = Required<
  PartialDeep<Pick<Protocol_User, 'gatewayId'>>
>;

const gatewayIdRegex =
  /^(?!.*\.\.)(?!.*\.\.$)(?!.*--)(?!.*--$)(?!.*__)(?!.*__$)[a-z0-9._-]{2,19}[a-z0-9]$/;

export const GatewayIdSchema: SchemaOf<UpdateGatewayId> = object({
  gatewayId: string()
    .min(2)
    .max(20)
    .test({
      name: 'gatewayId',
      message: 'Only lowercase letters, numbers and ._-',
      test: (value) => gatewayIdRegex.test(value),
    })
    .defined(),
});

export const defaultValues = (
  user?: PartialDeep<Users> | SessionUser
): UpdateGatewayId | undefined => {
  if (!user) return undefined;
  const { protocolUser } = user;
  const gatewayId = protocolUser.gatewayId;
  return {
    gatewayId,
  };
};
