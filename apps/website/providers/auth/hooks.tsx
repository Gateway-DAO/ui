import { useCallback, useEffect } from 'react';

import { useMutation, useQueryClient } from 'react-query';
import { useToggle } from 'react-use';
import { PartialDeep } from 'type-fest';
import { useAccount } from 'wagmi';

import { gqlAnonMethods, gqlMethods } from '../../services/api';
import { SessionUser } from '../../types/user';
import { useAuth } from './context';

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
      const { me } = await gqlMethods({ token: res.login.token }).me();

      return {
        ...res.login,
        ...me,
      };
    },
    {
      onSuccess(data) {
        queryClient.setQueryData('me', data);
      },
    }
  );

  return signIn;
}

export function useMe() {
  const queryClient = useQueryClient();

  const onSignOut = () => {
    queryClient.setQueryData('me', undefined);
  };

  const me: PartialDeep<SessionUser> = queryClient.getQueryData('me');

  return { me, onSignOut };
}
