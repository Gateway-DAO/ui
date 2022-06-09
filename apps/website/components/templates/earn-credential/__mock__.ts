import { paramCase } from 'change-case';

export const mockLevels = ['High', 'Normal', 'Low'].map((level) => ({
  value: paramCase(level),
  label: level,
}));

export const mockTypes = [
  'Feature',
  'Code',
  'Collaboration',
  'Event',
  'Other',
].map((type) => ({
  value: paramCase(type),
  label: type,
}));
