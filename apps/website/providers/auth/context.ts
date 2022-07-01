/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext } from 'react';

import { SessionUser } from '../../types/user';
import { AuthStatus } from './state';

type Context = {
  onSignOut: () => void;
  me?: SessionUser;
  status: AuthStatus;
  onOpenLogin: () => void;
};

export const AuthContext = createContext<Context>({
  onSignOut: () => {},
  status: 'UNAUTHENTICATED',
  onOpenLogin: () => {},
});

export const useAuth = () => useContext(AuthContext);
