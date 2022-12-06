import { getSession } from 'next-auth/react';

import { GraphQLClient } from 'graphql-request';

import { getSdk, SdkFunctionWrapper } from './graphql/types.generated';

export type GqlMethods = ReturnType<typeof getSdk>;

const glqAnonClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_HASURA_ENDPOINT
);

export const gqlAnonMethods = getSdk(glqAnonClient);

export const gqlUserHeader = (token: string, userId?: string) => ({
  'X-Hasura-Role': 'user',
  Authorization: `Bearer ${token}`,
  ...(userId && { 'X-Hasura-User-Id': userId }),
});

const gqlClient = (token?: string, userId?: string) =>
  new GraphQLClient(process.env.NEXT_PUBLIC_HASURA_ENDPOINT, {
    headers: token ? gqlUserHeader(token, userId) : undefined,
  });

export const gqlMethods = (token: string, userId?: string) =>
  getSdk(gqlClient(token, userId));

export const gqlMethodsWithRefresh = (
  token: string,
  userId: string | undefined,
  callback: (session) => void
) => {
  const wrapper: SdkFunctionWrapper = async (action) => {
    try {
      const res = await action();
      return res;
    } catch (e) {
      const isExpiredToken =
        e?.response?.errors?.[0].extensions.code === 'invalid-jwt';
      if (isExpiredToken) {
        const session = await getSession();
        await callback(session);
      }
      throw e;
    }
  };
  const methods = getSdk(gqlClient(token, userId), wrapper);
  return methods;
};
