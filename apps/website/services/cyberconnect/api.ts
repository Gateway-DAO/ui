import { GraphQLClient } from 'graphql-request';

import { getSdk } from './types';

export type GqlMethods = ReturnType<typeof getSdk>;

const cyberConnectClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_CYBERCONNECT_ENDPOINT
);
export const cyberConnectSDK = getSdk(cyberConnectClient);
