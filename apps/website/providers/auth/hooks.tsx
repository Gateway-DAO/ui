import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { PartialDeep } from 'type-fest';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';

import { ROUTES } from '../../constants/routes';
import { gqlAnonMethods, gqlMethods } from '../../services/hasura/api';
import { ErrorResponse } from '../../types/graphql';
import { SessionUser } from '../../types/user';
import { AuthStep } from './types';

/**
 * Handles Logoff session if there's no wallet connected
 */
function useSignOut(cb?: () => void) {
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

    cb?.();
  }, [address, disconnectAsync, token, cb]);

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
export const useAuthLogin = () => {
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const sign = useSignMessage();
  const { t } = useTranslation('common');

  const session = useSession();
  const token = session?.data?.token;

  const { enqueueSnackbar } = useSnackbar();

  const [error, setError] = useState<{
    message: any;
    label: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
  }>();

  const nonce = useQuery(
    [address, 'nonce'],
    () => gqlAnonMethods.get_nonce({ wallet: address, network: 'EVM' }),
    {
      enabled: !!address && session.status === 'unauthenticated',
      async onSuccess({ get_nonce: { nonce } }) {
        sendSignature.mutate(nonce);
      },
      onError(e: any) {
        setError({
          message: e?.response?.errors?.[0]?.message,
          label: t('actions.try-again'),
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
        await signInMutation.mutateAsync(signature);
      },
      onError() {
        setError({
          message: t('auth:connecting.errors.signature'),
          label: t('actions.try-again'),
        });
      },
      retry: false,
    }
  );

  const signInMutation = useMutation(
    ['signIn', address],
    (signature: string) =>
      signIn('credentials', {
        redirect: false,
        wallet: address,
        signature,
      }),
    {
      onError(e) {
        setError({
          message: JSON.stringify(e),
          label: t('actions.try-again'),
        });
      },
    }
  );

  const queryDefinitions = {
    enabled: !!token,
    select: (data) => data.me,
    refetchOnReconnect: true,
    refetchInterval: 1000 * 60 * 10,
    async onError(error: ErrorResponse) {
      const firstError = error?.response?.errors?.[0];

      enqueueSnackbar(
        firstError?.message?.includes('token') ||
          firstError?.message?.includes('jwt')
          ? t('auth:me.errors.invalid-token')
          : t('auth:me.errors.unknown'),
        {
          variant: 'error',
        }
      );
      onSignOut();
    },
  };

  const { refetchOnReconnect, refetchInterval, ...queryDefNoRefetch } =
    queryDefinitions;

  const user = useQueries({
    queries: [
      {
        queryKey: ['user_info', session?.data?.user_id],
        queryFn: () => gqlMethods(token).me_user_info(),
        ...queryDefinitions,
      },
      {
        queryKey: ['user_permissions', session?.data?.user_id],
        queryFn: () => gqlMethods(token).me_permissions(),
        ...queryDefinitions,
      },
      {
        queryKey: ['user_following', session?.data?.user_id],
        queryFn: () => gqlMethods(token).me_following(),
        ...queryDefinitions,
      },
      {
        queryKey: ['user_task_progresses', session?.data?.user_id],
        queryFn: () => gqlMethods(token).me_task_progresses(),
        ...queryDefNoRefetch,
      },
    ],
  });

  const me = useQuery(
    ['me', session?.data?.user_id],
    () => ({
      ...user[0].data,
      ...user[1].data,
      ...user[2].data,
      ...user[3].data,
    }),
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      refetchInterval: 1000 * 60 * 10,
      enabled: !!token && !!user.every((obj) => !!obj.data),
    }
  );

  const authStep: AuthStep = useMemo(() => {
    if (error) return 'error';
    if (nonce.fetchStatus === 'fetching') return 'get-nonce';
    if (sendSignature.isLoading) return 'send-signature';
    if (!me.data && me.isLoading && signInMutation.isSuccess) return 'get-me';
    if (me.data) return 'authenticated';
    return 'unauthenticated';
  }, [
    error,
    me.data,
    me.isLoading,
    nonce.fetchStatus,
    sendSignature.isLoading,
    signInMutation.isSuccess,
  ]);

  const onUpdateMe = (
    cb: (oldMe: PartialDeep<SessionUser>) => PartialDeep<SessionUser>
  ) => queryClient.setQueryData(['me', user[0].data?.id], cb);

  const onInvalidateMe = () => {
    queryClient.resetQueries(['user_info', session?.data?.user_id]);
    queryClient.resetQueries(['user_permissions', session?.data?.user_id]);
    queryClient.resetQueries(['user_following', session?.data?.user_id]);
    queryClient.resetQueries(['user_task_progresses', session?.data?.user_id]);
  };

  const onSignOut = useSignOut(() => {
    setError(undefined);
    me.remove();
    user.forEach((q) => q.remove());
    nonce.remove();
    sendSignature.reset();
    signInMutation.reset();
  });

  return {
    me: token ? me.data : undefined,
    error,
    authStep,
    onUpdateMe,
    onSignOut,
    onInvalidateMe,
  };
};

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
      router.replace({
        pathname: ROUTES.NEW_USER,
        query: { callback: router.asPath },
      });
    }
  }, [me, router]);
}
