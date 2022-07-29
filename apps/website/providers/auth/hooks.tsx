import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useMutation, useQuery, useQueryClient } from 'react-query';
import { PartialDeep } from 'type-fest';
import { useDisconnect } from 'wagmi';

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

export function useLogin() {
  const queryClient = useQueryClient();

  const signIn = useMutation(
    'signIn',
    async (credentials: Props) => {
      const res = await gqlAnonMethods.login({
        signature: credentials.signature,
        wallet: credentials.wallet,
      });

      const { error } = (res as any) ?? {};

      if (error || !res.login) {
        throw error;
      }
      /* get current user from hasura based on the token */
      const { me } = await gqlMethods(res.login.token).me();

      return {
        login: res.login,
        me: me,
      };
    },
    {
      onSuccess({ login, me }) {
        queryClient.setQueryData('token', login);
        queryClient.setQueryData('me', me);
      },
    }
  );

  return signIn;
}

export function useMe() {
  const queryClient = useQueryClient();
  const { disconnectAsync } = useDisconnect();

  const token = useQuery('token', () =>
    queryClient.getQueryData<LoginMutation['login']>('token')
  );

  const onUpdateToken = (newToken: RefreshMutation['refresh']) =>
    queryClient.setQueryData('token', (oldToken: LoginMutation['login']) => ({
      ...oldToken,
      token: newToken.token,
      refresh_token: newToken.refresh_token,
    }));

  const onSignOut = async () => {
    try {
      await disconnectAsync();
    } catch (_e) {
      //
    } finally {
      queryClient.setQueryData('token', null);
      queryClient.setQueryData('me', null);
    }
  };

  const me = useQuery(
    'me',
    async () =>
      (
        await gqlMethodsWithRefresh(
          token.data?.token,
          token.data?.refresh_token,
          undefined,
          onUpdateToken
        ).me()
      ).me,
    {
      enabled: !!token.data,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      refetchInterval: 1000 * 60 * 10,
      onError(error: ErrorResponse) {
        error.response.errors.forEach((err) => {
          if (err.extensions.code === 500 && err.message.includes('token')) {
            onSignOut();
          }
        });
      },
    }
  );

  const onUpdateMe = (
    cb: (oldMe: PartialDeep<SessionUser>) => PartialDeep<SessionUser>
  ) => queryClient.setQueryData('me', cb);

  return {
    me: me.data,
    tokens: token.data,
    onSignOut,
    onUpdateMe,
    onUpdateToken,
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

    // Redirects to Explore if authenticated and user already initialized
    if (router.pathname === ROUTES.LANDING && me && me.init) {
      router.replace(ROUTES.EXPLORE);
    }
  }, [me, router, status]);
}
