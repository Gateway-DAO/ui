import { GraphQLClient } from 'graphql-request';

import { getSdk } from './types';

export type GatewayProtocolSDKTypes = ReturnType<typeof getSdk>;

const gatewayProtocolClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_GATEWAY_PROTOCOL_ENDPOINT
);

export const gatewayProtocolSDK = getSdk(gatewayProtocolClient);
