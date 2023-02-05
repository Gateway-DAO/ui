/* eslint-disable @typescript-eslint/no-empty-function */
import { Session } from 'next-auth';
import { useSession, signOut } from 'next-auth/react';
import {
  PropsWithChildren,
  useMemo,
  useEffect,
  useCallback,
  useState,
} from 'react';

import { useConnectModal } from '@rainbow-me/rainbowkit';

import { AuthConnectingModal } from '../../components/organisms/auth-connecting-modal';
import { AuthModal } from '../../components/organisms/auth-modal';
import {
  gqlMethodsWithRefresh,
  gqlUserHeader,
} from '../../services/hasura/api';
import { BlockedPage } from './blocked-page';
import { AuthContext } from './context';
import { useAuthLogin, useInitUser } from './hooks';
type Props = {
  isAuthPage?: boolean;
};

export function AuthProvider({
  isAuthPage,
  children,
}: PropsWithChildren<Props>) {
  const { data: session } = useSession();
  const token = session?.token;

  const [isModalVisible, setModalVisible] = useState(false);

  const { me, error, onUpdateMe, authStep, onSignOut, onInvalidateMe } =
    useAuthLogin();

  const onInvalidRT = async (
    session: Session,
    callback?: (...args: any) => Promise<void>
  ) => {
    if (!!session && session?.error === 'RefreshAccessTokenError') {
      await signOut({ redirect: false });
      return;
    }

    if (session && callback) {
      await callback();
      return;
    }
  };

  useEffect(() => {
    onInvalidRT(session);
  }, [session]);

  const isBlocked = !!isAuthPage && (!me || !token);

  const gqlAuthMethods = useMemo(
    () => gqlMethodsWithRefresh(session?.token, session?.user_id, onInvalidRT),
    [session]
  );
  const fetchAuth = useCallback(
    async (url: string, options: Parameters<typeof fetch>[1]) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_ENDPOINT}/${url}`,
        {
          ...options,
          headers: {
            ...options.headers,
            ...gqlUserHeader(token, me?.id),
          },
        }
      );
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json);
      }
      return json;
    },
    [me?.id, token]
  );

  useInitUser(me);

  return (
    <AuthContext.Provider
      value={{
        me,
        token,
        gqlAuthMethods,
        fetchAuth,
        onOpenLogin: () => setModalVisible(true),
        onSignOut,
        onUpdateMe,
        onInvalidateMe,
        authenticated: !!me && !!session,
      }}
    >
      {!isBlocked && children}
      <AuthModal
        isOpen={isModalVisible && authStep == 'unauthenticated'}
        close={() => setModalVisible(false)}
      />
      <AuthConnectingModal
        step={authStep}
        error={error}
        isOpen={
          authStep === 'get-nonce' ||
          authStep === 'send-signature' ||
          authStep === 'get-me' ||
          authStep === 'error'
        }
        onRetry={onSignOut}
      />
      <BlockedPage isBlocked={isBlocked} />
    </AuthContext.Provider>
  );
}
