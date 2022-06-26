/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext } from 'react';

import { PartialDeep } from 'type-fest';

import { SessionUser } from '../../types/user';

type Context = {
  onSignOut: () => void;
  me?: PartialDeep<SessionUser>;
};

export const AuthContext = createContext<Context>({
  onSignOut: () => {},
});

export const useAuth = () => useContext(AuthContext);
