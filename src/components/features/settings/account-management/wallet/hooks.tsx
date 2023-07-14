import useTranslation from 'next-translate/useTranslation';
import { useMemo, useState } from 'react';

import { transformErrorMessage } from '@/constants/error-messages';
import { ConnectedWallet } from '@/hooks/wallet/use-connected-wallet';
import { useAuth } from '@/providers/auth';
import { WalletModalStep } from '@/providers/auth/types';
import { useMutation, useQuery } from '@tanstack/react-query';

type UseAddWalletModalProps = {
  hasWallet: boolean;
  isAdding: boolean;
  wallet: ConnectedWallet;
  onSuccess: () => void;
};

export function useAddWalletModal({
  hasWallet,
  isAdding,
  wallet,
  onSuccess: onAddWalletSuccess,
}: UseAddWalletModalProps) {
  const { hasuraUserService } = useAuth();
  const { t } = useTranslation('common');

  const [error, setError] = useState<{
    message: any;
    label: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
  }>();

  const createMessage = useQuery(
    ['add-wallet', wallet?.address],
    () =>
      hasuraUserService.protocol_add_wallet({
        wallet: wallet.address,
        chain: wallet.chain,
      }),
    {
      enabled: !!wallet?.address && !hasWallet && isAdding,
      async onSuccess(signature) {
        sendSignature.mutate(signature.protocol.addWallet.message);
      },
      onError(error: Error) {
        setError({
          message: transformErrorMessage(error),
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
        onAddWalletSuccess();
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
    if (createMessage.fetchStatus === 'fetching') return 'get-nonce';
    if (sendSignature.isLoading) return 'send-signature';
    if (addWalletMutation.isLoading) return 'add-wallet';
    if (addWalletMutation.isSuccess) return 'authenticated';
    return 'unauthenticated';
  }, [
    error,
    createMessage.fetchStatus,
    sendSignature.isLoading,
    addWalletMutation.isLoading,
    addWalletMutation.isSuccess,
  ]);

  const onReset = () => {
    createMessage.remove();
    setError(undefined);
  };

  return {
    step: addWalletStep,
    error,
    onReset,
  };
}
