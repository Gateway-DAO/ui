const chainIds = {
  Ethereum: 1,
  Ropsten: 3,
  Rinkeby: 4,
  Görli: 5,
  Kovan: 6,
  'Optimistic (mainnet)': 10,
  'Optimistic (kovan)': 69,
  'Binance Smart Chain (mainnet)': 56,
  'Binance Smart Chain (testnet)': 97,
  Polygon: 137,
  'Polygon (Mumbai)': 80001,
  Arbitrum: 42161,
  'Arbitrum Rinkeby': 421611,
};

export const mockChains = [
  'Ethereum',
  'Ropsten',
  'Rinkeby',
  'Görli',
  'Kovan',
  'Optimistic (mainnet)',
  'Optimistic (kovan)',
  'Binance Smart Chain (mainnet)',
  'Binance Smart Chain (testnet)',
  'Polygon',
  'Polygon (Mumbai)',
  'Arbitrum',
  'Arbitrum Rinkeby',
].map((chain) => ({
  value: chainIds[chain],
  label: chain,
}));
