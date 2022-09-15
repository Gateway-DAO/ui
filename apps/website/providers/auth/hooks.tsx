import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';

import { ROUTES } from '../../constants/routes';
import { gqlAnonMethods, gqlMethods } from '../../services/api';
import { ErrorResponse } from '../../types/graphql';
import { SessionUser } from '../../types/user';

/**
 * Handles Logoff session if there's no wallet connected
 */
export function useSignOut() {
  const session = useSession();
  const { address } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const token = session?.data?.token;

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

  useEffect(() => {
    if (session.status === 'authenticated' && !address) {
      onSignOut();
    }
  }, [address, onSignOut, session.status]);

  return onSignOut;
}

/**
 * Handles the login flow.
 * It listens for wallet connection, and if there's a wallet connected, it will
 * send a signature request to the wallet so we can verify the user.
 *
 * After the signature is sent, NextAuth will put a session in place, and then useMe will
 * be executed
 */
export const useAuthLogin = (onSignOut: () => Promise<void>) => {
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const sign = useSignMessage();

  const session = useSession();
  const token = session?.data?.token;

  const [error, setError] = useState<{
    message: any;
    label: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
  }>();

  const nonce = useQuery(
    [address, 'nonce'],
    () => gqlAnonMethods.get_nonce({ wallet: address }),
    {
      enabled: !!address && session.status === 'unauthenticated',
      async onSuccess({ get_nonce: { nonce } }) {
        sendSignature.mutate(nonce);
      },
      onError(e: any) {
        setError({
          message: e?.response?.errors?.[0]?.message,
          label: 'Try again',
        });
      },
    }
  );

  const sendSignature = useMutation(
    [address, nonce.data?.get_nonce?.nonce, 'signature'],
    (nonce: number) =>
      sign.signMessageAsync({
        message: `Welcome to Gateway!\n\nPlease sign this message for access: ${nonce}`,
      }),
    {
      async onSuccess(signature) {
        try {
          const res = await signIn('credentials', {
            redirect: false,
            wallet: address,
            signature,
          });
          console.log('success', res);
        } catch (e) {
          console.log('Eth login error', e);
        }
      },
      onError() {
        setError({
          message:
            "Error signing message. Please try again or contact support if it doesn't work.",
          label: 'Try again',
        });
      },
      retry: false,
    }
  );

  const me = useQuery(
    ['me', token, address],
    async () => await gqlMethods(token).me(),
    {
      enabled: !!token && !!address,
      select: (data) => data.me,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      refetchInterval: 1000 * 60 * 10,
      async onError(error: ErrorResponse) {
        const firstError = error?.response?.errors?.[0];
        if (
          firstError.extensions.code === 500 &&
          firstError.message.includes('token')
        ) {
          onSignOut();
        }
      },
    }
  );

  const onUpdateMe = (
    cb: (oldMe: PartialDeep<SessionUser>) => PartialDeep<SessionUser>
  ) => queryClient.setQueryData(['me'], cb);

  return {
    me: me.data,
    onUpdateMe,
  };
};

/** Redirects to Explore if not authenticated on a route that requires authentication */
export function useBlockedRoute(isBlocked: boolean) {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (isBlocked && session.status !== 'loading') {
      router.replace(ROUTES.EXPLORE);
    }
  }, [session.status, isBlocked, router]);
}

/**
 * Handles the initialization of the user.
 * If the user is authenticated but not registered, it will redirect to the New User page
 */
export function useInitUser(me: PartialDeep<SessionUser>) {
  const router = useRouter();

  useEffect(() => {
    if (!me) return;
    // Redirects to New User if authenticated but not registered
    if (router.pathname !== ROUTES.NEW_USER && me && !me.init) {
      router.replace(ROUTES.NEW_USER);
    }

    // Redirect to Explore if authenticated and registered
    // if (router.pathname === ROUTES.NEW_USER && me && me.init) {
    //   router.replace(ROUTES.EXPLORE);
    // }
  }, [me, router]);
}
