/* eslint-disable @typescript-eslint/no-empty-function */
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';

import { WalletModal } from 'apps/website/components/templates/landing/wallet-modal';
import useToggleContainerClass from 'apps/website/hooks/useToggleContainerClass';
import { useAccount, useDisconnect } from 'wagmi';

import { AuthContext } from './context';
import { useMe } from './hooks';
import { AuthStatus, useAuthStatus } from './state';

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
      {children}
      <WalletModal
        isOpen={status === 'SIGNING'}
        onClose={onUnauthenticated}
        onSuccess={onAuthenticated}
      />
    </AuthContext.Provider>
  );
}
