/* eslint-disable @typescript-eslint/no-empty-function */
import { PropsWithChildren, useCallback, useEffect, useMemo } from 'react';

import { useAccount, useDisconnect } from 'wagmi';

import { WalletModal } from '../../components/organisms/wallet-modal';
import useToggleContainerClass from '../../hooks/useToggleContainerClass';
import { gqlMethodsWithRefresh } from '../../services/api';
import { AuthContext } from './context';
import { useInitUser, useMe } from './hooks';
import { useAuthStatus } from './state';

type Props = {
  isAuthPage?: boolean;
};

export function AuthProvider({
  isAuthPage,
  children,
}: PropsWithChildren<Props>) {
  const { disconnect } = useDisconnect();
  const { me, onSignOut: onSignOutMe, onUpdateMe, onUpdateToken } = useMe();
  const { status, onAuthenticated, onConnecting, onUnauthenticated } =
    useAuthStatus(me);

  const { status: accountStatus, data: account } = useAccount();

  const gqlAuthMethods = useMemo(
    () => gqlMethodsWithRefresh(me, onUpdateToken),
    [me?.token, onUpdateToken]
  );

  const onSignOut = useCallback(() => {
    disconnect();
    onSignOutMe();
  }, [disconnect, onSignOutMe]);

  const isBlocked = isAuthPage && !me;

  useEffect(() => {
    if (isBlocked && status === 'UNAUTHENTICATED') {
      onConnecting();
    }
  }, [isBlocked, onConnecting, status]);

  useEffect(() => {
    if (!isAuthPage) return;
    if (accountStatus === 'loading' || accountStatus === 'idle') return;
    if (!account) {
      onSignOut();
    }
  }, [account, accountStatus, disconnect, isAuthPage, onSignOut]);

  useToggleContainerClass('blur', status === 'CONNECTING');

  useInitUser(status, me);

  return (
    <AuthContext.Provider
      value={{
        onSignOut,
        status,
        onOpenLogin: onConnecting,
        me,
        onUpdateMe,
        gqlAuthMethods,
      }}
    >
      {!isBlocked && children}
      {status !== 'AUTHENTICATED' && (
        <WalletModal
          isOpen={status === 'CONNECTING'}
          onClose={!isBlocked ? onUnauthenticated : undefined}
          onSuccess={onAuthenticated}
        />
      )}
    </AuthContext.Provider>
  );
}
