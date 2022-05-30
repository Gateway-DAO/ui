import { GraphQLClient } from 'graphql-request';

import { getSdk } from './graphql/types.generated';

const glqAnonClient = new GraphQLClient(process.env.HASURA_ENDPOINT);

const gqlClientServer = (token: string) =>
  new GraphQLClient(process.env.HASURA_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const gqlAnonMethods = getSdk(glqAnonClient);

export const gqlMethodsServer = (token: string) =>
  getSdk(gqlClientServer(token));
