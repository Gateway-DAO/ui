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
  'HR',
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

export const networks = [
  'discord',
  'email',
  'github',
  'medium',
  'other',
  'telegram',
  'twitter',
  'twitch',
  'website',
] as const;

export type Network = typeof networks[number];
