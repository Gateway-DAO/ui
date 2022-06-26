/* eslint-disable @typescript-eslint/no-empty-function */
import { PropsWithChildren, useCallback, useEffect } from 'react';

import { useAccount, useDisconnect } from 'wagmi';

import { AuthContext } from './context';
import { useMe } from './use-me';

type Props = {
  isAuthPage?: boolean;
};

export function AuthProvider({
  isAuthPage,
  children,
}: PropsWithChildren<Props>) {
  const { disconnect } = useDisconnect();
  const { me, onSignOut: onSignOutMe } = useMe();

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

  return (
    <AuthContext.Provider value={{ onSignOut, me }}>
      {children}
    </AuthContext.Provider>
  );
}
