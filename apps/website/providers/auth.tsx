import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import { useAccount, useDisconnect } from 'wagmi';

import { ROUTES } from '../constants/routes';
import { Users } from '../services/graphql/types.generated';

type Props = {
  me?: Users;
  isAuthPage?: boolean;
};

const AuthContext = createContext<{ onSignOut: () => void; me?: Users }>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onSignOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({
  me,
  isAuthPage,
  children,
}: PropsWithChildren<Props>) {
  const { disconnect } = useDisconnect();

  const { status: accountStatus, data: account } = useAccount();
  const { status: sessionStatus } = useSession();

  const onSignOut = useCallback(() => {
    disconnect();
    signOut({ callbackUrl: ROUTES.LANDING, redirect: true });
  }, [disconnect]);

  useEffect(() => {
    if (!isAuthPage) return;
    if (
      accountStatus === 'loading' ||
      accountStatus === 'idle' ||
      sessionStatus === 'loading'
    )
      return;
    if (sessionStatus === 'unauthenticated' || !account) {
      onSignOut();
    }
  }, [
    account,
    accountStatus,
    disconnect,
    isAuthPage,
    onSignOut,
    sessionStatus,
  ]);

  return (
    <AuthContext.Provider value={{ onSignOut, me }}>
      {children}
    </AuthContext.Provider>
  );
}
