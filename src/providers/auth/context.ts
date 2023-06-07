/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext } from 'react';

import { HasuraApi, hasuraPublicService } from '@/services/hasura/api';

import { SessionUser } from '../../types/user';

type Context = {
  me?: SessionUser;
  token?: string;
  gqlAuthMethods: HasuraApi;
  fetchAuth: (
    url: string,
    options: Parameters<typeof fetch>[1]
  ) => Promise<any>;
  authenticated: boolean;
  onSignOut: () => void;
  onOpenLogin: () => void;
  onUpdateMe: (cb: (oldMe: SessionUser) => SessionUser) => SessionUser | void;
  onInvalidateMe: () => void;
};

export const AuthContext = createContext<Context>({
  gqlAuthMethods: hasuraPublicService,
  authenticated: false,
  fetchAuth: fetch,
  onSignOut: () => {},
  onOpenLogin: () => {},
  onUpdateMe: () => {},
  onInvalidateMe: () => {},
});

export const useAuth = () => useContext(AuthContext);
