import { paramCase } from 'change-case';

export const mockLevels = ['High', 'Normal', 'Low'].map((level) => ({
  value: paramCase(level),
  label: level,
}));
