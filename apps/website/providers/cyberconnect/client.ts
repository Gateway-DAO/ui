import CyberConnect, { Env, Blockchain } from '@cyberlab/cyberconnect';

export const cyberConnect = new CyberConnect({
  namespace: 'GatewayDAO',
  env: Env.STAGING,
  chain: Blockchain.ETH,
  signingMessageEntity: 'GatewayDAO',
  provider: window.ethereum,
});
