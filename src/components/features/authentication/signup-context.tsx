import { createContext } from 'react';

export const SignUpContext = createContext<{
  setSignUpSteps?: (steps: number) => void;
  isLoading?: boolean;
  signUpData?: any;
}>({
  setSignUpSteps: () => {},
  isLoading: false,
  signUpData: null,
});
