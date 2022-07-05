/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext } from 'react';

import { SessionUser } from '../../types/user';
import { AuthStatus } from './state';

type Context = {
  onSignOut: () => void;
  me?: SessionUser;
  status: AuthStatus;
  onOpenLogin: () => void;
  onUpdateMe: (
    cb: (oldMe: PartialDeep<SessionUser>) => PartialDeep<SessionUser>
  ) => PartialDeep<SessionUser> | void;
};

export const AuthContext = createContext<Context>({
  status: 'UNAUTHENTICATED',
  onSignOut: () => {},
  onOpenLogin: () => {},
  onUpdateMe: () => {},
});

export const useAuth = () => useContext(AuthContext);
