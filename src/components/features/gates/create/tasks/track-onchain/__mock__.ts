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

export const mockParamsType = [
  {
    id: 0,
    name: 'address',
    type: 'reserve',
  },
  {
    id: 1,
    name: 'address',
    type: 'user',
  },
  {
    id: 2,
    name: 'address',
    type: 'onBehalfOf',
  },
  {
    id: 3,
    name: 'uint16',
    type: 'referral',
  },
  {
    id: 4,
    name: 'uint256',
    type: 'borrowRate',
  },
  {
    id: 5,
    name: 'uint256',
    type: 'amount',
  },
];

export const mockEvents = [
  {
    id: 0,
    name: 'Borrow',
  },
  {
    id: 1,
    name: 'Deposit',
  },
  {
    id: 2,
    name: 'FlashLoan',
  },
  {
    id: 3,
    name: 'LiquidationCall',
  },
  {
    id: 4,
    name: 'RebalanceStableBorrowRate',
  },
  {
    id: 5,
    name: 'Repay',
  },
  {
    id: 6,
    name: 'ReserveDataUpdated',
  },
  {
    id: 7,
    name: 'ReserveUsedAsCollateralDisabled',
  },
];
