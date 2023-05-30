import { paramCase } from 'change-case';

export const mockCategories = ['Credential', 'User'].map((category) => ({
  value: paramCase(category),
  label: category,
}));
