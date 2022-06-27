/* eslint-disable @typescript-eslint/no-empty-function */
import { PropsWithChildren, useCallback, useEffect } from 'react';

import { useAccount, useDisconnect } from 'wagmi';

import { WalletModal } from '../../components/organisms/wallet-modal';
import useToggleContainerClass from '../../hooks/useToggleContainerClass';
import { AuthContext } from './context';
import { useMe } from './hooks';
import { useAuthStatus } from './state';

type Props = {
  isAuthPage?: boolean;
};

export function AuthProvider({
  isAuthPage,
  children,
}: PropsWithChildren<Props>) {
  const { disconnect } = useDisconnect();
  const { me, onSignOut: onSignOutMe } = useMe();
  const { status, onAuthenticated, onSigning, onUnauthenticated } =
    useAuthStatus(me);

  const { status: accountStatus, data: account } = useAccount();

  const onSignOut = useCallback(() => {
    disconnect();
    onSignOutMe();
  }, [disconnect, onSignOutMe]);

  const isBlocked = isAuthPage && !me;

  useEffect(() => {
    if (isBlocked && status === 'UNAUTHENTICATED') {
      onSigning();
    }
  }, [isBlocked, onSigning, status]);

  useEffect(() => {
    if (!isAuthPage) return;
    if (accountStatus === 'loading' || accountStatus === 'idle') return;
    if (!account) {
      onSignOut();
    }
  }, [account, accountStatus, disconnect, isAuthPage, onSignOut]);

  useToggleContainerClass('blur', status === 'SIGNING');

  return (
    <AuthContext.Provider
      value={{ onSignOut, status, onOpenLogin: onSigning, me }}
    >
      {!isBlocked && children}
      {status !== 'AUTHENTICATED' && (
        <WalletModal
          isOpen={status === 'SIGNING'}
          onClose={!isBlocked ? onUnauthenticated : undefined}
          onSuccess={onAuthenticated}
        />
      )}
    </AuthContext.Provider>
  );
}
