import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useMutation, useQuery, useQueryClient } from 'react-query';
import { PartialDeep } from 'type-fest';

import { ROUTES } from '../../constants/routes';
import { gqlAnonMethods, gqlMethods } from '../../services/api';
import { SessionUser } from '../../types/user';
import { useAuth } from './context';
import { AuthStatus } from './state';

type Props = {
  wallet: string;
  signature: string;
};

export function useLogin() {
  const signIn = useMutation('me', async (credentials: Props) => {
    const res = await gqlAnonMethods.login({
      signature: credentials.signature,
      wallet: credentials.wallet,
    });

    const { error } = (res as any) ?? {};

    if (error || !res.login) {
      throw error;
    }
    /* get current user from hasura based on the token */
    const { me } = await gqlMethods({ token: res.login.token }).me();

    return {
      ...res.login,
      ...me,
    } as PartialDeep<SessionUser>;
  });

  return signIn;
}

export function useMe() {
  const queryClient = useQueryClient();

  const onSignOut = () => {
    queryClient.setQueryData('me', undefined);
  };

  const me = useQuery('me').data;

  return { me, onSignOut };
}

export function useInitUser(status: AuthStatus, me: PartialDeep<SessionUser>) {
  const router = useRouter();

  console.log({ me });

  useEffect(() => {
    if (
      router.pathname !== ROUTES.LANDING &&
      router.pathname !== ROUTES.NEW_USER &&
      status === 'AUTHENTICATED' &&
      me &&
      !me.init
    ) {
      router.replace(ROUTES.NEW_USER);
    }
  }, [me, router, status]);
}
