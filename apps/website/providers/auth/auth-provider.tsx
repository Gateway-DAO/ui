/* eslint-disable @typescript-eslint/no-empty-function */
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useMemo } from 'react';

import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import { useModalState } from '@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/ModalContext';
import { useAccount } from 'wagmi';

import { WalletModal } from '../../components/organisms/wallet-modal';
import { ROUTES } from '../../constants/routes';
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

  const { status: accountStatus, address } = useAccount();

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
    if (accountStatus === 'connecting' || accountStatus === 'reconnecting')
      return;
    if (!address && me) {
      onSignOut();
    }
  }, [address, accountStatus, isAuthPage, onSignOut, me]);

  useInitUser(status, me);

  const { accountModalOpen } = useModalState();

  return (
    <ConnectButton.Custom>
      {({
        authenticationStatus,
        connectModalOpen,
        openConnectModal,
        account,
      }) => {
        console.log(`connectModalOpen: `, connectModalOpen);
        console.log(`account: `, account);
        return (
          <>
            <AuthContext.Provider
              value={{
                onSignOut,
                status,
                onOpenLogin: openConnectModal,
                me,
                onUpdateMe,
                gqlAuthMethods,
              }}
            >
              {/* <ConnectButton
        accountStatus={{ largeScreen: 'full', smallScreen: 'avatar' }}
      /> */}
              {!isBlocked && children}
              {status !== 'AUTHENTICATED' && (
                <WalletModal
                  isOpen={status === 'CONNECTING'}
                  onClose={
                    !isBlocked ? onUnauthenticated : onCloseModalWhenBlocked
                  }
                  onSuccess={onAuthenticated}
                />
              )}
            </AuthContext.Provider>
          </>
        );
      }}
    </ConnectButton.Custom>
  );
}
