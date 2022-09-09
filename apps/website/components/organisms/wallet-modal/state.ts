import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useAccount, useQuery, useSignMessage } from 'wagmi';

import { useLogin } from '../../../providers/auth/hooks';
import { gqlAnonMethods } from '../../../services/api';

export type Step =
  | 'GET_ACCOUNT'
  | 'GET_NONCE'
  | 'GET_SIGNATURE'
  | 'GET_TOKEN'
  | 'FINISHED';

/*
Get nonce -> sign message -> login using wallet and signature
*/
export function useConnectWallet() {
  const { address } = useAccount();
  const [step, setStep] = useState<Step>('GET_NONCE');
  const [error, setError] = useState<{
    message: any;
    label: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
  }>();

  const signIn = useLogin();

  const sign = useSignMessage();

  /* Handles nonce generation */
  const nonce = useQuery(
    [address, 'nonce'],
    () => gqlAnonMethods.get_nonce({ wallet: address }),
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
    [address, nonce.data?.get_nonce?.nonce, 'signature'],
    (nonce: number) =>
      sign.signMessageAsync({
        message: `Welcome to Gateway!\n\nPlease sign this message for access: ${nonce}`,
      }),
    {
      async onSuccess(signature) {
        setStep('GET_TOKEN');
        await signIn.mutateAsync({
          wallet: address!,
          signature,
        });
        setStep('FINISHED');
      },
      onError(e: any) {
        setError({
          message:
            "Error signing message. Please try again or contact support if it doesn't work.",
          label: 'Try again',
        });
      },
      retry: false,
    }
  );

  return {
    step,
    error,
    isLoading: step !== 'FINISHED' && !error,
  };
}
