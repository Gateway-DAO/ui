import { paramCase } from 'change-case';

export const categories = [
  'Community/Social',
  'Data',
  'Financial ',
  'Governance',
  'HR',
  'Infrastructure',
  'Operating System',
  'Collaboration',
  'Services ',
  'Grants',
  'Treasury',
  'Investment',
  'Media',
  'Product ',
  'Protocol',
  'Research',
  'Bio',
];

export const categoriesDropdown = categories.map((category) => ({
  label: category,
  value: paramCase(category),
}));
