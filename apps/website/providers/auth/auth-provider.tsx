/* eslint-disable @typescript-eslint/no-empty-function */
import { useSession } from 'next-auth/react';
import { PropsWithChildren, useMemo } from 'react';

import { useConnectModal } from '@rainbow-me/rainbowkit';

import { gqlMethods } from '../../services/api';
import { AuthContext } from './context';
import {
  useAuthLogin,
  useBlockedRoute,
  useInitUser,
  useSignOut,
} from './hooks';
type Props = {
  isAuthPage?: boolean;
};

// TODO:
// - [ ] Add a loading state to the auth provider
// - [ ] Implement refresh token
// - [ ] Route guard with loading state -> Go to a auth page while loading the session state

export function AuthProvider({
  isAuthPage,
  children,
}: PropsWithChildren<Props>) {
  const session = useSession();
  const token = session?.data?.token;

  const { openConnectModal } = useConnectModal();

  const onSignOut = useSignOut();

  const { me, onUpdateMe } = useAuthLogin(onSignOut);

  const isBlocked = isAuthPage && (!me || !token);

  const gqlAuthMethods = useMemo(
    () => gqlMethods(session?.data?.token, me?.id),
    [session?.data?.token, me?.id]
  );

  useBlockedRoute(isBlocked);

  useInitUser(me);

  return (
    <AuthContext.Provider
      value={{
        me,
        onSignOut,
        onOpenLogin: openConnectModal,
        onUpdateMe,
        gqlAuthMethods,
      }}
    >
      {!isBlocked && children}
    </AuthContext.Provider>
  );
}
