import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { PropsWithChildren, useEffect } from 'react';

import { useAccount, useDisconnect } from 'wagmi';

import { ROUTES } from '../constants/routes';

type Props = {
  isAuthPage?: boolean;
};

export function AuthProvider({
  isAuthPage,
  children,
}: PropsWithChildren<Props>) {
  const { disconnect } = useDisconnect();

  const { status: accountStatus, data: account } = useAccount();
  const { status: sessionStatus } = useSession();

  useEffect(() => {
    if (!isAuthPage) return;
    if (
      accountStatus === 'loading' ||
      accountStatus === 'idle' ||
      sessionStatus === 'loading'
    )
      return;
    if (sessionStatus === 'unauthenticated' || !account) {
      disconnect();
      signOut({ callbackUrl: ROUTES.LANDING, redirect: true });
    }
  }, [account, accountStatus, disconnect, isAuthPage, sessionStatus]);

  return <>{children}</>;
}
