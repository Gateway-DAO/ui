import { GraphQLClient } from 'graphql-request';

import { SessionUser } from '../types/user';
import { getSdk } from './graphql/types.generated';

export const glqAnonClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
  {
    headers: {},
  }
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

export const gqlMethods = (user: Partial<SessionUser>) =>
  getSdk(gqlClient(user));
