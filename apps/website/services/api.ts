import { GraphQLClient } from 'graphql-request';

import { SessionUser } from '../types/user';
import {
  getSdk,
  RefreshMutation,
  SdkFunctionWrapper,
} from './graphql/types.generated';

export type GqlMethods = ReturnType<typeof getSdk>;

const glqAnonClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_HASURA_ENDPOINT
);

export const gqlAnonMethods = getSdk(glqAnonClient);

const gqlUserHeader = (user: Partial<SessionUser>) => ({
  'X-Hasura-Role': 'user',
  Authorization: `Bearer ${user?.token}`,
  ...(user.id && { 'X-Hasura-User-Id': user.id as string }),
});

const gqlClient = (user: Partial<SessionUser>) =>
  new GraphQLClient(process.env.NEXT_PUBLIC_HASURA_ENDPOINT, {
    headers: user ? gqlUserHeader(user) : undefined,
  });

export const gqlMethods = (user: Partial<SessionUser>) =>
  getSdk(gqlClient(user));

export const gqlMethodsWithRefresh = (
  user: Partial<SessionUser>,
  saveToken: (newTokens: RefreshMutation['refresh']) => void
) => {
  const wrapper: SdkFunctionWrapper = async (action, name) => {
    console.log(name);
    try {
      const res = await action();
      console.log('success', res);
      return res;
    } catch (e) {
      console.log('error', e);

      const isExpiredToken =
        e?.response?.errors?.[0].extensions.code === 'invalid-jwt';
      console.log(isExpiredToken);
      if (isExpiredToken) {
        /* Retrieves the new token */
        const newTokens = (
          await gqlAnonMethods.refresh({
            refresh_token: user.refresh_token,
          })
        )?.refresh;

        /* Saves the token on stored user */
        const res = await action(gqlUserHeader({ ...user, ...newTokens }));
        saveToken(newTokens);
        return res;
      }
      throw e;
    }
  };
  const methods = getSdk(gqlClient(user), wrapper);
  return methods;
};
