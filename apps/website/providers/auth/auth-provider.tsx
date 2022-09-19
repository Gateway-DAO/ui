/* eslint-disable @typescript-eslint/no-empty-function */
import { useSession } from 'next-auth/react';
import { PropsWithChildren, useMemo } from 'react';

import { useConnectModal } from '@rainbow-me/rainbowkit';

import { AuthConnectingModal } from '../../components/organisms/auth-connecting-modal';
import { gqlMethods } from '../../services/api';
import { AuthContext } from './context';
import { useAuthLogin, useBlockedRoute, useInitUser } from './hooks';
type Props = {
  isAuthPage?: boolean;
};

// TODO:
// - [x] Add a loading state to the auth provider
// - [ ] Implement refresh token
// - [ ] Route guard with loading state -> Go to a auth page while loading the session state
// - [ ] Route guard new-user if the user is already verified ON MOUNT ONLY, because if the user is verified after the page submission, we don't always want to redirect to the home page

export function AuthProvider({
  isAuthPage,
  children,
}: PropsWithChildren<Props>) {
  const session = useSession();
  const token = session?.data?.token;

  const { openConnectModal } = useConnectModal();

  const { me, error, onUpdateMe, authStep, onSignOut, onInvalidateMe } =
    useAuthLogin();

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
        gqlAuthMethods,
        onOpenLogin: openConnectModal,
        onSignOut,
        onUpdateMe,
        onInvalidateMe,
      }}
    >
      {!isBlocked && children}
      <AuthConnectingModal
        step={authStep}
        error={error}
        isOpen={
          authStep === 'get-nonce' ||
          authStep === 'send-signature' ||
          authStep === 'get-me' ||
          authStep === 'error'
        }
        onRetry={onSignOut}
      />
    </AuthContext.Provider>
  );
}
