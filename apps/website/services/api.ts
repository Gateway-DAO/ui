import { GraphQLClient } from 'graphql-request';

import { getSdk } from './graphql/types.generated';

export const gqlMethods = (auth: string) => {
  const gqlClient = new GraphQLClient(process.env.NEXT_PUBLIC_HASURA_ENDPOINT, {
    headers: {
      Authentication: `Bearer ${auth}`,
    },
  });

  return getSdk(gqlClient);
};
