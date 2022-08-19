import CyberConnect, { Env, Blockchain } from '@cyberlab/cyberconnect';

const endpoint = process.env.NEXT_PUBLIC_CYBERCONNECT_ENDPOINT;

const env =
  !!endpoint && endpoint !== '' && !endpoint.includes('.stg.')
    ? Env.PRODUCTION
    : Env.STAGING;

export const createCyberConnectClient = () =>
  new CyberConnect({
    namespace: 'GatewayDAO',
    env,
    chain: Blockchain.ETH,
    signingMessageEntity: 'GatewayDAO',
    provider: window.ethereum,
  });
