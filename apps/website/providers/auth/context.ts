/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext } from 'react';

import { GqlMethods, gqlAnonMethods } from '../../services/api';
import { SessionUser } from '../../types/user';

type Context = {
  me?: SessionUser;
  gqlAuthMethods: GqlMethods;
  onSignOut: () => void;
  onOpenLogin: () => void;
  onUpdateMe: (cb: (oldMe: SessionUser) => SessionUser) => SessionUser | void;
};

export const AuthContext = createContext<Context>({
  gqlAuthMethods: gqlAnonMethods,
  onSignOut: () => {},
  onOpenLogin: () => {},
  onUpdateMe: () => {},
});

export const useAuth = () => useContext(AuthContext);
