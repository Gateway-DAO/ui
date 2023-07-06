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

import { WalletConnectModal } from '@/components/organisms/wallet-connect-modal';
import { WalletConnectingModal } from '@/components/organisms/wallet-connecting-modal';
import { hasuraApiWithRefresh, hasuraUserHeader } from '@/services/hasura/api';

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

  const {
    me,
    error,
    onUpdateMe,
    WalletModalStep,
    onRetry,
    onSignOut,
    onInvalidateMe,
  } = useAuthLogin();

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

  const hasuraUserService = useMemo(
    () => hasuraApiWithRefresh(session?.token, session?.hasura_id, onInvalidRT),
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
            ...hasuraUserHeader(token, me?.id),
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
        hasuraUserService,
        fetchAuth,
        onOpenLogin: () => setModalVisible(true),
        onSignOut,
        onUpdateMe,
        onInvalidateMe,
        isAuthenticated: !!me && !!session,
      }}
    >
      {!isBlocked && children}
      <WalletConnectModal
        isOpen={isModalVisible}
        close={() => setModalVisible(false)}
      />
      <WalletConnectingModal
        step={WalletModalStep}
        error={error}
        isOpen={
          WalletModalStep === 'get-nonce' ||
          WalletModalStep === 'send-signature' ||
          WalletModalStep === 'get-me' ||
          WalletModalStep === 'error'
        }
        onRetry={onRetry}
        onCancel={onSignOut}
      />
      <BlockedPage isBlocked={isBlocked} />
    </AuthContext.Provider>
  );
}
