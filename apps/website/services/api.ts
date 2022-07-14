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

/* All the Graphql requests with a request guard for invalid tokens */
export const gqlMethodsWithRefresh = (
  user: Partial<SessionUser>,
  saveToken: (newTokens: RefreshMutation['refresh']) => void
) => {
  /* Caches Graphql Requests with current token */
  let methods = getSdk(gqlClient(user));

  const names = Object.keys(methods) as (keyof typeof methods)[];

  const maxRetries = 3;

  /* Request guard for calls with expired token */
  const refreshTokenRetryWrapper = (
    name: keyof typeof methods,
    retries = 0
  ) => {
    const method = methods[name];
    const methodCall = async (variables) => {
      try {
        const res = await method(variables);
        return res;
      } catch (e) {
        console.log(user);
        const isExpiredToken =
          e?.response?.errors?.[0].extensions.code === 'invalid-jwt';
        if (isExpiredToken && retries < maxRetries) {
          /* Retrieves the new token */
          const newTokens = await gqlAnonMethods.refresh({
            refresh_token: user.refresh_token,
          });
          /* Saves the token on stored user */
          saveToken(newTokens.refresh);
          /* Re-Caches the graphql requests with new token */
          methods = getSdk(gqlClient(newTokens.refresh));
          return refreshTokenRetryWrapper[name](variables, retries + 1);
        }
        throw e;
      }
    };
    return methodCall;
  };

  /* Guards all graphql requests */
  return names.reduce(
    (acc, methodName) => ({
      ...acc,
      [methodName]: refreshTokenRetryWrapper(methodName),
    }),
    {}
  ) as GqlMethods;
};
