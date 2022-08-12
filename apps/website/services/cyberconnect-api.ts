import CyberConnect, { Env, Blockchain } from '@cyberlab/cyberconnect';
import { GraphQLClient } from 'graphql-request';

import { getSdk } from './graphql/types.generated';

export const cyberConnect = new CyberConnect({
  namespace: 'GatewayDAO',
  env: Env.STAGING,
  chain: Blockchain.ETH,
  signingMessageEntity: 'GatewayDAO',
  provider: window.ethereum,
});

export type GqlMethods = ReturnType<typeof getSdk>;

export const gqlCyberConnectClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_CYBERCONNECT_ENDPOINT
);
