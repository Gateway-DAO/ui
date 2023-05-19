/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext } from 'react';

import {
  GatewayProtocolSDKTypes,
  gatewayProtocolSDK,
} from '@/services/gateway-protocol/api';
import { GqlMethods, gqlAnonMethods } from '@/services/hasura/api';
import { SessionUser } from '../../types/user';

type Context = {
  me?: SessionUser;
  token?: string;
  gqlAuthMethods: GqlMethods;
  gqlProtocolAuthMethods: GatewayProtocolSDKTypes;
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
  gqlAuthMethods: gqlAnonMethods,
  gqlProtocolAuthMethods: gatewayProtocolSDK,
  authenticated: false,
  fetchAuth: fetch,
  onSignOut: () => {},
  onOpenLogin: () => {},
  onUpdateMe: () => {},
  onInvalidateMe: () => {},
});

export const useAuth = () => useContext(AuthContext);
