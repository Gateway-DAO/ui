import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useWallet } from '@solana/wallet-adapter-react';
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useLocalStorage } from 'react-use';
import { PartialDeep } from 'type-fest';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';

import { ROUTES } from '../../constants/routes';
import {
  gatewayProtocolAuthSDK,
  gatewayProtocolSDK,
} from '../../services/gateway-protocol/api';
import { Chain } from '../../services/gateway-protocol/types';
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

  // EVM
  const { address: EVMaddress } = useAccount();
  const sign = useSignMessage();

  // Solana
  const { publicKey: solanaAddress, connecting } = useWallet();

  const address = EVMaddress || solanaAddress?.toString();

  const { t } = useTranslation('common');
  const [protocolToken, setProtocolToken, removeProtocolToken] =
    useLocalStorage<string>('protocol');
  const session = useSession();
  const token = session?.data?.token;

  const { enqueueSnackbar } = useSnackbar();

  const [error, setError] = useState<{
    message: any;
    label: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
  }>();

  const nonceNode = useQuery(
    [address, 'nonce'],
    () =>
      gqlAnonMethods.get_nonce({
        wallet: address,
        network: address.startsWith('0x') ? 'EVM' : 'SOL',
      }),
    {
      enabled: !!address && session.status === 'unauthenticated',
      async onSuccess({ get_nonce: { nonce } }) {
        sendSignatureNode.mutate(nonce);
      },
      onError(e: any) {
        setError({
          message: e?.response?.errors?.[0]?.message,
          label: t('actions.try-again'),
        });
      },
    }
  );

  const sendSignatureNode = useMutation(
    [address, nonceNode.data?.get_nonce?.nonce, 'signature'],
    (nonce: number) =>
      sign.signMessageAsync({
        message: `Welcome to Gateway!\n\nPlease sign this message for access: ${nonce}`,
      }),
    {
      async onSuccess(signature) {
        queryClient.setQueryData(
          [address, nonceNode.data?.get_nonce?.nonce, 'signature'],
          signature
        );
        // await signInMutation.mutateAsync(signature);
        nonceProtocol.mutate();
      },
      onError() {
        queryClient.invalidateQueries([
          address,
          nonceNode.data?.get_nonce?.nonce,
          'signature',
        ]);
        setError({
          message: t('auth:connecting.errors.signature'),
          label: t('actions.try-again'),
        });
      },
      retry: false,
    }
  );

  const nonceProtocol = useMutation(
    [address, 'nonce'],
    () => gatewayProtocolSDK.get_nonce({ wallet: address, chain: Chain.Evm }),
    {
      async onSuccess({ createNonce: { message } }) {
        sendSignatureProtocol.mutate(message);
      },
      onError(e: any) {
        setError({
          message: e?.response?.errors?.[0]?.message,
          label: t('actions.try-again'),
        });
      },
    }
  );

  const sendSignatureProtocol = useMutation(
    [address, nonceProtocol.data?.createNonce?.message, 'signature'],
    (message: string) =>
      sign.signMessageAsync({
        message,
      }),
    {
      async onSuccess(signature) {
        await loginProtocol.mutateAsync(signature);
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

  const loginProtocol = useMutation(
    [address, 'protocol-login'],
    async (signature: string) => {
      const {
        login: { token },
      } = await gatewayProtocolSDK.login({
        wallet: address,
        signature,
      });
      return token;
    },
    {
      onSuccess(token) {
        setProtocolToken(token);
        signInMutation.mutateAsync(sendSignatureNode.data);
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

  const {
    refetchOnReconnect: _1,
    refetchInterval: _2,
    ...queryDefNoRefetch
  } = queryDefinitions;

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
      {
        queryKey: ['user_protocol', protocolToken],
        queryFn: async () => {
          const res = await gatewayProtocolAuthSDK(protocolToken).meProtocol();
          return {
            me: {
              protocol: res.me,
            },
          };
        },
        ...queryDefNoRefetch,
      },
    ],
  });

  const me = useQuery(
    ['me', session?.data?.user_id],
    () => user.reduce((acc, obj) => ({ ...acc, ...obj.data }), {}),
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
    if (nonceNode.fetchStatus === 'fetching') return 'get-nonce';
    if (sendSignatureNode.isLoading) return 'send-signature';
    if (nonceProtocol.isLoading) return 'get-nonce';
    if (sendSignatureProtocol.isLoading) return 'send-signature';
    if (
      loginProtocol.isLoading ||
      (!me.data && me.isLoading && signInMutation.isSuccess)
    )
      return 'get-me';
    if (me.data) return 'authenticated';
    return 'unauthenticated';
  }, [
    error,
    me.data,
    me.isLoading,
    nonceNode.fetchStatus,
    nonceProtocol.isLoading,
    sendSignatureNode.isLoading,
    sendSignatureProtocol.isLoading,
    loginProtocol.isLoading,
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
    queryClient.resetQueries(['user_protocol', protocolToken]);
  };

  const onSignOut = useSignOut(() => {
    setError(undefined);
    me.remove();
    user.forEach((q) => q.remove());
    nonceNode.remove();
    sendSignatureNode.reset();
    nonceProtocol.reset();
    sendSignatureProtocol.reset();
    signInMutation.reset();
    loginProtocol.reset();
    queryClient.invalidateQueries([
      address,
      nonceNode.data?.get_nonce?.nonce,
      'signature',
    ]);
    removeProtocolToken();
  });

  return {
    me: token ? me.data : undefined,
    protocolToken,
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
