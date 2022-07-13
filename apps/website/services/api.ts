import { GraphQLClient } from 'graphql-request';

import { SessionUser } from '../types/user';
import { getSdk, RefreshMutation } from './graphql/types.generated';

export const glqAnonClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
  {}
);

/* While we don't have authentication on place */
const gqlClient = (user: Partial<SessionUser>) =>
  new GraphQLClient(process.env.NEXT_PUBLIC_HASURA_ENDPOINT, {
    headers: {
      'X-Hasura-Role': 'user',
      Authorization: `Bearer ${user.token}`,
      ...(user.id && { 'X-Hasura-User-Id': user.id }),
    },
  });

export const gqlAnonMethods = getSdk(glqAnonClient);

export type GqlMethods = ReturnType<typeof getSdk>;

export const gqlMethods = (user: Partial<SessionUser>) =>
  getSdk(gqlClient(user));

export const gqlMethodsWithRefresh = (
  user: Partial<SessionUser>,
  saveToken: (newTokens: RefreshMutation['refresh']) => void
) => {
  const methods = getSdk(gqlClient(user));

  const names = Object.keys(methods) as (keyof typeof methods)[];

  const refreshTokenRetryWrapper = (name: keyof typeof methods) => {
    const method = methods[name];
    return async (variables) => {
      try {
        return method(variables);
      } catch (e) {
        console.log("Error on '" + name + "'", e);
        if (e.response && e.response.status === 401) {
          const newTokens = await gqlAnonMethods.refresh({
            refresh_token: user.refresh_token,
          });
          saveToken(newTokens.refresh);
          return method(variables);
        }
        throw e;
      }
    };
  };

  return names.reduce(
    (acc, methodName) => ({
      ...acc,
      [methodName]: refreshTokenRetryWrapper(methodName),
    }),
    {}
  ) as GqlMethods;
};
