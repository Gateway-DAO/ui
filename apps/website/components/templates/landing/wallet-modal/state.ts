import { signIn } from 'next-auth/react';
import { useState } from 'react';

import { useMutation } from 'react-query';
import { useAccount, useSignMessage } from 'wagmi';

import { gqlAnonMethods } from '../../../../services/api';

type Step =
  | 'GET_ACCOUNT'
  | 'GET_NONCE'
  | 'GET_SIGNATURE'
  | 'GET_TOKEN'
  | 'FINISHED';

/*
Get nonce -> sign message -> login using wallet and signature
*/
export function useConnectWallet() {
  const [step, setStep] = useState<Step>('GET_NONCE');
  const [error, setError] = useState<{
    message: any;
    label: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    onClick?: () => any;
  }>();

  const sign = useSignMessage();
  const account = useAccount({
    onSuccess() {
      setStep('GET_NONCE');
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
    () => gqlAnonMethods.get_nonce({ wallet: account.data.address! }),
    {
      async onSuccess({ get_nonce: { nonce } }) {
        setStep('GET_SIGNATURE');
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
        setStep('GET_TOKEN');
        login.mutate({
          wallet: account.data.address!,
          signature,
        });
      },
      onError(e: any) {
        setError({
          message: e.message,
          label: 'Try again',
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
        setStep('FINISHED');
      },
      onError(e) {
        console.error('Login error', e);
        setError({
          label: 'Try again',
          message: (e as any)?.response?.errors?.[0]?.message,
        });
      },
    }
  );

  const onReset = () => {
    setStep('GET_NONCE');
    setError(undefined);
    nonce.reset();
    sign.reset();
    login.reset();
  };

  return {
    step,
    error,
    isLoading: step !== 'FINISHED' && !error,
    onReset,
  };
}
