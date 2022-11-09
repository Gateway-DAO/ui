/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext } from 'react';

import { GqlMethods, gqlAnonMethods } from '../../services/api';
import { SessionUser } from '../../types/user';

type Context = {
  me?: SessionUser;
  token?: string;
  gqlAuthMethods: GqlMethods;
  authenticated: boolean;
  onSignOut: () => void;
  onOpenLogin: () => void;
  onUpdateMe: (cb: (oldMe: SessionUser) => SessionUser) => SessionUser | void;
  onInvalidateMe: () => void;
};

export const AuthContext = createContext<Context>({
  gqlAuthMethods: gqlAnonMethods,
  authenticated: false,
  onSignOut: () => {},
  onOpenLogin: () => {},
  onUpdateMe: () => {},
  onInvalidateMe: () => {},
});

export const useAuth = () => useContext(AuthContext);
