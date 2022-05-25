import { GraphQLClient } from 'graphql-request';

import { getSdk } from './graphql/types.generated';
/*
export const gqlMethods = (auth: string) => {
  const gqlClient = new GraphQLClient(process.env.NEXT_PUBLIC_HASURA_ENDPOINT, {
    headers: {
      Authentication: `Bearer ${auth}`,
    },
  });

  return getSdk(gqlClient);
};
 */

/* While we don't have authentication on place */
const gqlClientClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
  {
    headers: {
      //   'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
      // 'X-Hasura-Role': 'unauthenticated',
    },
  }
);

export const gqlMethodsClient = getSdk(gqlClientClient);
