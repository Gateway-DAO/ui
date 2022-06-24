/* eslint-disable @typescript-eslint/no-empty-function */
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import { useToggle } from 'react-use';
import { PartialDeep } from 'type-fest';
import { useAccount, useDisconnect } from 'wagmi';

import { WalletModal } from '../components/templates/landing/wallet-modal';
import { ROUTES } from '../constants/routes';
import { useMe, useSignOut } from '../hooks/use-me';
import useToggleContainerClass from '../hooks/useToggleContainerClass';
import { SessionUser } from '../types/user';

type Props = {
  isAuthPage?: boolean;
};

type Context = {
  onSignOut: () => void;
  onOpenModal: () => void;
  me?: PartialDeep<SessionUser>;
};

const AuthContext = createContext<Context>({
  onSignOut: () => {},
  onOpenModal: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({
  isAuthPage,
  children,
}: PropsWithChildren<Props>) {
  const [isOpen, toggleOpen] = useToggle(false);
  useToggleContainerClass('blur', isOpen);
  const onOpenModal = () => toggleOpen(true);

  const { disconnect } = useDisconnect();
  const me = useMe();
  const signOut = useSignOut();

  const { status: accountStatus, data: account } = useAccount();
  const { status: sessionStatus } = useSession();

  const onSignOut = useCallback(() => {
    disconnect();
    signOut();
  }, [disconnect, signOut]);

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
    <AuthContext.Provider value={{ onSignOut, onOpenModal, me }}>
      {children}
      <WalletModal isOpen={isOpen} onClose={toggleOpen} />
    </AuthContext.Provider>
  );
}
