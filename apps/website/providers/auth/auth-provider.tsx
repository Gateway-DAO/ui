/* eslint-disable @typescript-eslint/no-empty-function */
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useMemo } from 'react';

import { useAccount } from 'wagmi';

import { WalletModal } from '../../components/organisms/wallet-modal';
import { ROUTES } from '../../constants/routes';
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
  const { me, tokens, onSignOut, onUpdateMe, onUpdateToken } = useMe();
  const { status, onAuthenticated, onConnecting, onUnauthenticated } =
    useAuthStatus(tokens);

  const { status: accountStatus, data: account } = useAccount();

  const router = useRouter();

  const gqlAuthMethods = useMemo(
    () =>
      gqlMethodsWithRefresh(
        tokens?.token,
        tokens?.refresh_token,
        me?.id,
        onUpdateToken
      ),
    [tokens?.token, tokens?.refresh_token, me?.id, onUpdateToken]
  );

  const isBlocked = isAuthPage && (!me || !tokens);

  const onCloseModalWhenBlocked = async () => {
    await router.replace(ROUTES.LANDING);
    onUnauthenticated();
  };

  useEffect(() => {
    if (isBlocked && status === 'UNAUTHENTICATED') {
      onConnecting();
    }
  }, [isBlocked, onConnecting, status]);

  useEffect(() => {
    if (!isAuthPage) return;
    if (accountStatus === 'loading' || accountStatus === 'idle') return;
    if (!account && me) {
      onSignOut();
    }
  }, [account, accountStatus, isAuthPage, onSignOut, me]);

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
          onClose={!isBlocked ? onUnauthenticated : onCloseModalWhenBlocked}
          onSuccess={onAuthenticated}
        />
      )}
    </AuthContext.Provider>
  );
}
