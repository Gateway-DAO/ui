const chainIds = {
  Ethereum: 1,
  Görli: 5,
  Kovan: 6,
  Optimistic: 10,
  'Binance Smart Chain': 56,
  Polygon: 137,
  Arbitrum: 42161,
};

export const mockChains = ['Polygon', 'Ethereum', 'Arbitrum', 'Optimistic'].map(
  (chain) => ({
    value: chainIds[chain],
    label: chain,
  })
);
