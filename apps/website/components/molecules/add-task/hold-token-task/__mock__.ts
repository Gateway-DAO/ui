import { paramCase } from 'change-case';

export const mockChains = [
  'Ethereum',
  'Polygon',
  'Binance Chain',
  'Binance Chain Testnet',
  'Avalanche',
  'Klaytn',
  'Celo Alfajores',
  'Celo Baklava',
  'Celo RC1',
  'Goerli',
  'Velas',
].map((chain) => ({
  value: paramCase(chain),
  label: chain,
}));
