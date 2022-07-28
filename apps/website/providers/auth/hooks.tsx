import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useMutation, useQuery, useQueryClient } from 'react-query';
import { PartialDeep } from 'type-fest';

import { ROUTES } from '../../constants/routes';
import { gqlAnonMethods, gqlMethods } from '../../services/api';
import {
  LoginMutation,
  RefreshMutation,
} from '../../services/graphql/types.generated';
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

  const token = useQuery('token', () =>
    queryClient.getQueryData<LoginMutation['login']>('token')
  );

  const me = useQuery(
    'me',
    async () => (await gqlMethods(token.data.token).me()).me,
    {
      enabled: !!token.data,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    }
  );

  const onUpdateMe = (
    cb: (oldMe: PartialDeep<SessionUser>) => PartialDeep<SessionUser>
  ) => queryClient.setQueryData('me', cb);

  const onSignOut = () => {
    queryClient.setQueryData('token', undefined);
    queryClient.setQueryData('me', undefined);
  };

  const onUpdateToken = (newToken: RefreshMutation['refresh']) =>
    queryClient.setQueryData('token', (oldToken: LoginMutation['login']) => ({
      ...oldToken,
      token: newToken.token,
      refresh_token: newToken.refresh_token,
    }));

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
    // Redirects to Explore if authenticated and user already initialized
    if (router.pathname === ROUTES.LANDING && me && me.init) {
      router.replace(ROUTES.EXPLORE);
    }
  }, [me, router, status]);
}
