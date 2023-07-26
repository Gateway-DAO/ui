import useTranslation from 'next-translate/useTranslation';
import { useMemo, useState } from 'react';

import { transformErrorMessage } from '@/constants/error-messages';
import { ConnectedWallet } from '@/hooks/wallet/use-connected-wallet';
import { useAuth } from '@/providers/auth';
import { WalletModalStep } from '@/providers/auth/types';
import { hasuraPublicService } from '@/services/hasura/api';
import {
  Get_NonceMutation,
  Login_WalletMutation,
  Protocol_Add_WalletMutation,
  Protocol_Api_AuthType,
  Protocol_Api_Chain,
} from '@/services/hasura/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import base58 from 'bs58';

import { MigrationModalData } from '../migration/migration-modal';

type UseAddWalletModalProps = {
  hasWallet: boolean;
  isAdding: boolean;
  wallet: ConnectedWallet;
  onMigrate: (data: MigrationModalData) => void;
  onSuccess: () => void;
};

export function useAddWalletModal({
  hasWallet,
  isAdding,
  wallet,
  onSuccess: onAddWalletSuccess,
  onMigrate,
}: UseAddWalletModalProps) {
  const { hasuraUserService } = useAuth();
  const { t } = useTranslation('common');
  const [isMigration, setIsMigration] = useState(false);

  const [error, setError] = useState<{
    message: any;
    label: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
  }>();

  const createMessage = useQuery(
    ['add-wallet', wallet?.address],
    async () => {
      const data = {
        wallet: wallet.address,
        chain: wallet.chain,
      };
      if (isMigration) {
        return hasuraPublicService.get_nonce(data);
      }

      try {
        const res = await hasuraUserService.protocol_add_wallet(data);
        return res;
      } catch (e) {
        if (e?.response?.errors?.[0]?.message === 'WALLET_ALREADY_REGISTERED') {
          setIsMigration(true);
          return hasuraPublicService.get_nonce(data);
        }
        throw e;
      }
    },
    {
      enabled: !!wallet?.address && !hasWallet && isAdding,
      async onSuccess(signature) {
        let message: string;
        if (isMigration) {
          message = (signature as Get_NonceMutation).protocol.createWalletNonce
            .message;
        } else {
          message = (signature as Protocol_Add_WalletMutation).protocol
            .addWallet.message;
        }
        sendSignature.mutate(message);
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
    async (signature: string | Uint8Array) => {
      signature =
        wallet.chain === Protocol_Api_Chain.Sol
          ? base58.encode(signature as Uint8Array)
          : (signature as string);

      if (isMigration)
        return hasuraPublicService.login_wallet({
          wallet: wallet.address,
          signature,
        });

      return hasuraUserService.protocol_add_wallet_confirmation({
        wallet: wallet.address,
        chain: wallet.chain,
        signature,
      });
    },
    {
      async onSuccess(res) {
        if (isMigration) {
          const { hasura_id, token } = (res as Login_WalletMutation).protocol
            .loginWallet;
          onMigrate({
            data: wallet,
            hasura_id,
            token,
            type: Protocol_Api_AuthType.Wallet,
          });
          return;
        }
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
    setIsMigration(false);
  };

  return {
    step: addWalletStep,
    error,
    onReset,
  };
}
