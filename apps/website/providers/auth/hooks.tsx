import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCookie } from 'react-use';
import { PartialDeep } from 'type-fest';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';

import { ROUTES } from '../../constants/routes';
import {
  gqlAnonMethods,
  gqlMethods,
  gqlMethodsWithRefresh,
} from '../../services/api';
import {
  LoginMutation,
  RefreshMutation,
} from '../../services/graphql/types.generated';
import { ErrorResponse } from '../../types/graphql';
import { SessionUser } from '../../types/user';
import { AuthStatus } from './state';

type Props = {
  wallet: string;
  signature: string;
};

export const useAuthLogin = () => {
  const { address } = useAccount();
  const sign = useSignMessage();
  const session = useSession();

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
};

export function useMe() {
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const session = useSession();
  const token = session?.data?.token;
  const { disconnectAsync } = useDisconnect();

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
}

export function useInitUser(status: AuthStatus, me: PartialDeep<SessionUser>) {
  const router = useRouter();

  useEffect(() => {
    if (status !== 'AUTHENTICATED') return;
    // Redirects to New User if authenticated but not registered
    if (router.pathname !== ROUTES.NEW_USER && me && !me.init) {
      router.replace(ROUTES.NEW_USER);
    }

    // Redirect to Explore if authenticated and registered
    if (router.pathname === ROUTES.NEW_USER && me && me.init) {
      router.replace(ROUTES.EXPLORE);
    }
  }, [me, router, status]);
}
