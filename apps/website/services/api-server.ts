import { GraphQLClient } from 'graphql-request';

import { getSdk } from './graphql/types.generated';

const gqlClientServer = new GraphQLClient(process.env.HASURA_ENDPOINT, {
  headers: {
    'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
  },
});

export const gqlMethodsServer = getSdk(gqlClientServer);
