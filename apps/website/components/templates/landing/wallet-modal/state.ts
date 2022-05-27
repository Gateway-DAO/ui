import { signIn } from 'next-auth/react';
import { useState } from 'react';

import { useMutation } from 'react-query';
import { useAccount, useSignMessage } from 'wagmi';

import { gqlMethodsClient } from '../../../../services/api';

type State =
  | 'GET_ACCOUNT'
  | 'GET_NONCE'
  | 'GET_SIGNATURE'
  | 'GET_TOKEN'
  | 'FINISHED';

/*
Get nonce -> sign message -> login using wallet and signature
*/
export function useConnectWallet() {
  const [state, setState] = useState<State>('GET_NONCE');
  const [error, setError] = useState<{
    message: any;
    label: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    onClick?: () => any;
  }>();

  const sign = useSignMessage();
  const account = useAccount({
    onSuccess() {
      setState('GET_NONCE');
      nonce.mutate();
    },
    onError(e) {
      setError({
        label: 'Reconnect to Wallet',
        message: account.error,
      });
    },
  });

  /* Handles nonce generation */
  const nonce = useMutation(
    [account.data?.address, 'nonce'],
    () => gqlMethodsClient.get_nonce({ wallet: account.data.address! }),
    {
      async onSuccess({ get_nonce: { nonce } }) {
        setState('GET_SIGNATURE');
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

  /* Handles wallet signature */
  const sendSignature = useMutation(
    [account.data?.address, nonce.data?.get_nonce?.nonce, 'signature'],
    (nonce: number) =>
      sign.signMessageAsync({
        message: `Welcome to Gateway!\n\nPlease sign this message for access: ${nonce}`,
      }),
    {
      onSuccess(signature) {
        setState('GET_TOKEN');
        login.mutate({
          wallet: account.data.address!,
          signature,
        });
      },
      onError(e: any) {
        setError({
          message: e.message,
          label: 'Try sign again',
          onClick: () => sendSignature.mutate(nonce.data?.get_nonce?.nonce),
        });
      },
      retry: false,
    }
  );

  /* Handle login session authentication */
  const login = useMutation(
    [account.data?.address, nonce.data?.get_nonce?.nonce, 'signature'],
    async ({ wallet, signature }: { wallet: string; signature: string }) => {
      const res = await signIn('credentials', {
        redirect: false,
        wallet,
        signature,
      });
      if (res.error) throw res.error;
      return res;
    },
    {
      async onSuccess(data) {
        console.log('Login success', data);
      },
      onError(e) {
        console.error('Login error', e);
        setError({
          label: 'try again',
          message: (e as any)?.response?.errors?.[0]?.message,
        });
      },
    }
  );

  const onReset = () => {
    setState('GET_NONCE');
    setError(undefined);
    nonce.reset();
    sign.reset();
    login.reset();
  };

  return {
    state,
    error,
    isLoading: state !== 'FINISHED' && !error,
    onReset,
  };
}
