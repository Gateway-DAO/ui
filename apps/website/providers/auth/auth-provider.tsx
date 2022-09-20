/* eslint-disable @typescript-eslint/no-empty-function */
import { useSession } from 'next-auth/react';
import { PropsWithChildren, useMemo } from 'react';

import { useConnectModal } from '@rainbow-me/rainbowkit';

import { AuthConnectingModal } from '../../components/organisms/auth-connecting-modal';
import { gqlMethods } from '../../services/api';
import { BlockedPage } from './blocked-page';
import { AuthContext } from './context';
import { useAuthLogin, useInitUser } from './hooks';
type Props = {
  isAuthPage?: boolean;
};

export function AuthProvider({
  isAuthPage,
  children,
}: PropsWithChildren<Props>) {
  const session = useSession();
  const token = session?.data?.token;

  const { openConnectModal } = useConnectModal();

  const { me, error, onUpdateMe, authStep, onSignOut, onInvalidateMe } =
    useAuthLogin();

  const isBlocked = !!isAuthPage && (!me || !token);

  const gqlAuthMethods = useMemo(
    () => gqlMethods(session?.data?.token, me?.id),
    [session?.data?.token, me?.id]
  );

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
      <BlockedPage isBlocked={isBlocked} />
    </AuthContext.Provider>
  );
}
