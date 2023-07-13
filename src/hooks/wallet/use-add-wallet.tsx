import useTranslation from 'next-translate/useTranslation';
import { useMemo, useState } from 'react';

import { useAuth } from '@/providers/auth';
import { useDisconnectWallets } from '@/providers/auth/hooks';
import { WalletModalStep } from '@/providers/auth/types';
import { useMutation } from '@tanstack/react-query';

import { useConnectedWallet } from './use-connected-wallet';

export function useAddWalletModal() {
  const { hasuraUserService } = useAuth();
  const { t } = useTranslation('common');

  const wallet = useConnectedWallet();
  const onDisconnect = useDisconnectWallets();

  const [error, setError] = useState<{
    message: any;
    label: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
  }>();

  // TODO: Do useQuery before
  const createMessage = useMutation(
    () =>
      hasuraUserService.protocol_add_wallet({
        wallet: wallet.address,
        chain: wallet.chain,
      }),
    {
      async onSuccess(signature) {
        sendSignature.mutate(signature.protocol.addWallet.message);
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

  const sendSignature = useMutation(
    (message: string) => wallet.signMessage(message) as Promise<any>,
    {
      async onSuccess(signature) {
        addWalletMutation.mutate(signature);
      },
      onError(e) {
        setError({
          message: JSON.stringify(e),
          label: t('actions.try-again'),
        });
      },
    }
  );

  const addWalletMutation = useMutation(
    (signature: string) =>
      hasuraUserService.protocol_add_wallet_confirmation({
        wallet: wallet.address,
        chain: wallet.chain,
        signature,
      }),
    {
      async onSuccess() {
        onDisconnect();
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

  const addWalletStep: WalletModalStep = useMemo(() => {
    if (error) return 'error';
    if (createMessage.isLoading) return 'get-nonce';
    if (sendSignature.isLoading) return 'send-signature';
    if (addWalletMutation.isLoading) return 'add-wallet';
    if (addWalletMutation.isSuccess) return 'authenticated';
    return 'unauthenticated';
  }, [
    error,
    createMessage.isLoading,
    sendSignature.isLoading,
    addWalletMutation.isLoading,
    addWalletMutation.isSuccess,
  ]);

  return {
    step: addWalletStep,
    error,
    onRequestWalletSignature: createMessage.mutate,
  };
}
