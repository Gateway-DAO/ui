/* eslint-disable @typescript-eslint/no-empty-function */
import { useSession, signOut } from 'next-auth/react';
import { PropsWithChildren, useCallback, useEffect, useMemo } from 'react';

import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';

import { gqlMethods, gqlMethodsWithRefresh } from '../../services/api';
import { AuthContext } from './context';
import { useAuthLogin, useMe } from './hooks';
type Props = {
  isAuthPage?: boolean;
};

// TODO:
// - [ ] Add a loading state to the auth provider
// - [ ] Implement refresh token
// - [ ] Route guard with loading state -> Go to a auth page while loading the session state

export function AuthProvider({
  isAuthPage,
  children,
}: PropsWithChildren<Props>) {
  const { openConnectModal } = useConnectModal();

  const { address } = useAccount();
  const { disconnectAsync } = useDisconnect();

  const session = useSession();
  const token = session?.data?.token;

  const { me } = useMe();

  const isBlocked = isAuthPage && (!me || !token);
  useAuthLogin();

  const onSignOut = useCallback(async () => {
    try {
      if (address) {
        await disconnectAsync();
      }
      // eslint-disable-next-line no-empty
    } catch {}

    try {
      if (token) {
        await signOut({ redirect: false });
      }
      // eslint-disable-next-line no-empty
    } catch {}
  }, [address, disconnectAsync, token]);

  const gqlAuthMethods = useMemo(
    () => gqlMethods(session?.data?.token, me?.id),
    [session?.data?.token, me?.id]
  );

  useEffect(() => {
    if (me && !address) {
      onSignOut();
    }
  }, [address, onSignOut, me]);

  /*
  const { me, tokens, onSignOut, onUpdateMe, onUpdateToken } = useMe();

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

  const onCloseModalWhenBlocked = async () => {
    await router.replace(ROUTES.LANDING);
    onUnauthenticated();
  };

  useEffect(() => {
    if (isBlocked && status === 'UNAUTHENTICATED') {
      onConnecting();
    }
  }, [isBlocked, onConnecting, status]);

  useInitUser(status, me);
  */

  return (
    <>
      <AuthContext.Provider
        value={{
          onSignOut,
          onOpenLogin: async () => {
            await onSignOut();
            openConnectModal();
          },
          me,
          onUpdateMe: () => {},
          gqlAuthMethods,
        }}
      >
        {!isBlocked && children}
      </AuthContext.Provider>
    </>
  );
}
