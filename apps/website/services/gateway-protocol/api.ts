import { GraphQLClient } from 'graphql-request';

import { getSdk } from './types';

export type GatewayProtocolSDKTypes = ReturnType<typeof getSdk>;

const gatewayProtocolClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_GATEWAY_PROTOCOL_ENDPOINT
);

const gatewayProtocolAuthClient = (token: string) =>
  new GraphQLClient(process.env.NEXT_PUBLIC_GATEWAY_PROTOCOL_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const gatewayProtocolSDK = getSdk(gatewayProtocolClient);
export const gatewayProtocolAuthSDK = (token: string) =>
  getSdk(gatewayProtocolAuthClient(token));
