import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { ROUTES } from '@/constants/routes';
import { hasuraPublicService, hasuraApi } from '@/services/hasura/api';
import { Protocol_Api_Chain } from '@/services/hasura/types';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import bs58 from 'bs58';
import { useSnackbar } from 'notistack';
import { PartialDeep } from 'type-fest';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';

import { ErrorResponse } from '../../types/graphql';
import { SessionUser } from '../../types/user';
import type { WalletModalStep } from './types';

/**
 * Handles disconnect wallets
 */
export function useDisconnectWallets() {
  const { disconnectAsync: disconnectEVM } = useDisconnect();
  const { disconnect: disconnectSolana } = useWallet();

  return async () => Promise.allSettled([disconnectEVM(), disconnectSolana()]);
}

/**
 * Handles Logoff session if there's no wallet connected
 */
function useSignOut(cb?: () => void) {
  const session = useSession();
  const token = session?.data?.token;
  const onDisconnect = useDisconnectWallets();

  const onSignOut = useCallback(async () => {
    await onDisconnect();

    try {
      if (token) {
        await signOut({ redirect: false });
      }
      // eslint-disable-next-line no-empty
    } catch {}

    cb?.();
  }, [cb, token]);

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

  // EVM
  const { address: EVMaddress } = useAccount();
  const sign = useSignMessage();

  // Solana
  const { publicKey: solanaAddress, signMessage } = useWallet();

  const address = EVMaddress || solanaAddress?.toString();
  const chain = useMemo(() => {
    if (!address) return null;
    return address.startsWith('0x')
      ? Protocol_Api_Chain.Evm
      : Protocol_Api_Chain.Sol;
  }, [address]);

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
    [session?.data?.protocol_id, 'nonce'],
    () =>
      hasuraPublicService.get_nonce({
        wallet: address,
        chain,
      }),
    {
      enabled: !!address && session.status === 'unauthenticated',
      async onSuccess({
        protocol: {
          createWalletNonce: { message },
        },
      }) {
        sendSignature.mutate(message);
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
    [address, chain, 'signature'],
    (message: string): Promise<any> => {
      switch (chain) {
        case Protocol_Api_Chain.Evm:
          return sign.signMessageAsync({ message });
        case Protocol_Api_Chain.Sol:
          // pass message to signMessage from string to Uint8Array
          return signMessage(new TextEncoder().encode(message));
        default:
          throw new Error('Invalid chain');
      }
    },
    {
      async onSuccess(signature) {
        switch (chain) {
          case Protocol_Api_Chain.Evm:
            signInMutation.mutate(signature as string);
            break;
          case Protocol_Api_Chain.Sol:
            signInMutation.mutate(bs58.encode(signature as Uint8Array));
            break;
          default:
            throw new Error('Invalid chain');
        }
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
    async (signature: string) => {
      const res = await signIn('credential-wallet', {
        redirect: false,
        wallet: address,
        signature,
      });

      if (!res.ok) {
        throw new Error(res.error);
      }
    },
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

  const {
    refetchOnReconnect: _1,
    refetchInterval: _2,
    ...queryDefNoRefetch
  } = queryDefinitions;

  const user = useQueries({
    queries: [
      {
        queryKey: ['user_info', session?.data?.hasura_id],
        queryFn: () => hasuraApi(token).me_user_info(),
        ...queryDefinitions,
      },
      {
        queryKey: ['user_permissions', session?.data?.hasura_id],
        queryFn: () => hasuraApi(token).me_permissions(),
        ...queryDefinitions,
      },
      {
        queryKey: ['user_following', session?.data?.hasura_id],
        queryFn: () => hasuraApi(token).me_following(),
        ...queryDefinitions,
      },
      {
        queryKey: ['user_task_progresses', session?.data?.hasura_id],
        queryFn: () => hasuraApi(token).me_task_progresses(),
        ...queryDefNoRefetch,
      },
      {
        queryKey: ['user_protocol', session?.data?.hasura_id],
        queryFn: async () => {
          const res = await hasuraApi(token).me_protocol();
          return {
            me: {
              protocol: res.protocol.me,
            },
          };
        },
        ...queryDefNoRefetch,
      },
    ],
  });

  const me = useQuery(
    ['me', session?.data?.hasura_id],
    () => user.reduce((acc, obj) => ({ ...acc, ...obj.data }), {}),
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      refetchInterval: 1000 * 60 * 10,
      enabled: !!token && !!user.every((obj) => !!obj.data),
    }
  );

  const WalletModalStep: WalletModalStep = useMemo(() => {
    if (error) return 'error';
    if (nonce.isFetching) return 'get-nonce';
    if (sendSignature.isLoading) return 'send-signature';
    if (signInMutation.isLoading || (!me.data && signInMutation.isSuccess))
      return 'get-me';
    if (me.data) return 'authenticated';
    return 'unauthenticated';
  }, [
    error,
    me.data,
    nonce.isFetching,
    sendSignature.isLoading,
    signInMutation.isLoading,
    signInMutation.isSuccess,
  ]);

  const onUpdateMe = (
    cb: (oldMe: PartialDeep<SessionUser>) => PartialDeep<SessionUser>
  ) => queryClient.setQueryData(['me', user[0].data?.id], cb);

  const onInvalidateMe = async () =>
    Promise.all([
      queryClient.resetQueries(['user_info', session?.data?.hasura_id]),
      queryClient.resetQueries(['user_permissions', session?.data?.hasura_id]),
      queryClient.resetQueries(['user_following', session?.data?.hasura_id]),
      queryClient.resetQueries([
        'user_task_progresses',
        session?.data?.hasura_id,
      ]),
      queryClient.resetQueries(['user_protocol', session?.data?.hasura_id]),
    ]);

  const onRetry = () => {
    setError(undefined);
    me.remove();
    user.forEach((q) => q.remove());
    nonce.remove();
    sendSignature.reset();
    signInMutation.reset();
  };

  const onSignOut = useSignOut(onRetry);

  return {
    me: token ? me.data : undefined,
    error,
    WalletModalStep,
    onUpdateMe,
    onSignOut,
    onRetry,
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
    if (
      router.pathname !== ROUTES.AUTHENTICATION &&
      me &&
      (!me.username || !me.email_address)
    ) {
      router.replace({
        pathname: ROUTES.AUTHENTICATION,
        query: { redirect: router.asPath },
      });
    }
  }, [me, router]);
}
