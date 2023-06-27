import { createContext } from 'react';

export const EmailSignUpProgress = createContext<{
  isLoading: boolean;
  setSignUpSteps: (steps: number) => void;
}>({
  isLoading: false,
  setSignUpSteps: () => {},
});

export * from './card-summary';
