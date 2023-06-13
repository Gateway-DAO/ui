import { paramCase } from 'change-case';

export const categories = [
  'DeFi',
  'Dex',
  'Staking',
  'Bridge',
  'YieldFarming',
  'GameFi',
  'Launchpad',
  'CeFi',
  'NFT',
  'Collectibles',
  'NFT Marketplace',
  'NFT-Fi',
  'NFT-Data',
  'Web3',
  'DID',
  'Social',
  'Play-To-Earn',
  'Metaverse',
  'Infrastructure',
  'Wallet',
  'Privacy',
  'Storage',
  'DAO',
  'API Provider',
  'Layer 1',
  'Layer 2',
];

export const categoriesDropdown = categories.map((category) => ({
  label: category,
  value: paramCase(category),
}));

export const categoriesMap = categories.reduce(
  (acc, category) => acc.set(paramCase(category), category),
  new Map<string, string>()
);

export const networksLabels = [
  'Discord',
  'Email',
  'GitHub',
  'Medium',
  'reddit',
  'Telegram',
  'Twitter',
  'Twitch',
  'Website',
  'Other',
] as const;

export const networks = networksLabels.map((network) =>
  network.toLowerCase()
) as Lowercase<(typeof networksLabels)[number]>[];

export type Network = (typeof networks)[number];

/* Record of network values to labels */
export const networkValueLabelMap = networksLabels.reduce(
  (acc, network, index) => ({
    ...acc,
    [networks[index]]: network,
  }),
  {} as Record<Network, (typeof networksLabels)[number]>
);
