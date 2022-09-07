import { paramCase } from 'change-case';

export const categories = [
  'Onboarding',
  'Marketing',
  'DeFi',
  'Gaming',
  'Music',
  'DAO Tool',
  'Analytics',
  'Art',
  'Community',
  'Social',
  'Data',
  'Financial',
  'Governance',
  'Education',
  'Human Ressources',
  'Infrastructure',
  'Operating System',
  'Collaboration',
  'Services',
  'Grants',
  'Treasury',
  'Investment',
  'Media',
  'Product',
  'Protocol',
  'Research',
  'Bio',
  'Impact',
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
) as Lowercase<typeof networksLabels[number]>[];

export type Network = typeof networks[number];

/* Record of network values to labels */
export const networkValueLabelMap = networksLabels.reduce(
  (acc, network, index) => ({
    ...acc,
    [networks[index]]: network,
  }),
  {} as Record<Network, typeof networksLabels[number]>
);
