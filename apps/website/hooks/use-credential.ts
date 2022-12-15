import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';
import {
  useAccount,
  useContractWrite,
  useNetwork,
  useQueryClient,
  useSwitchNetwork,
  useWaitForTransaction,
} from 'wagmi';

import { CREDENTIAL_ABI } from '../constants/web3';
import { useAuth } from '../providers/auth';
import { Credentials } from '../services/graphql/types.generated';
import { getExplorer } from '../utils/web3';

type Status = 'idle' | 'asking_signature' | 'minting' | 'minted' | 'error';

const isGasless = process.env.NEXT_PUBLIC_GASLESS_MINTING === 'true';

export const useCredential = (credential: PartialDeep<Credentials>) => {
  // State
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<Error | null>(null);
  const { me, gqlAuthMethods, onInvalidateMe } = useAuth();

  const resetStatus = () => setStatus('idle');

  // Query client
  const queryClient = useQueryClient();

  // Wagmi
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork({
    throwForSwitchChainNotSupported: true,
  });

  const { writeAsync: contractMint, data } = useContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: CREDENTIAL_ABI,
    functionName: 'mint',
    mode: 'recklesslyUnprepared',
    overrides: {
      gasLimit: 300000,
    },
    onMutate: () => setStatus('asking_signature'),
    onSuccess: () => setStatus('minting'),
    onError: (err) => {
      setStatus('error');
      setError(err);
    },
  });

  const mintOptions = {
    onMutate: () => setStatus('minting'),
    onSuccess: () => {
      // queryClient.refetchQueries(['credentials']);
      // queryClient.resetQueries(['credential', credential.id]);
      window.location.reload();

      onInvalidateMe();

      setStatus('minted');
    },
    onError: (err) => {
      setStatus('error');
      setError(err);
    },
  };

  const { mutateAsync: updateCredential } = useMutation(
    (txHash: string) =>
      gqlAuthMethods.update_credential_status({
        id: credential?.id,
        status: 'minted',
        transaction_url: `${getExplorer(
          parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)
        )}/tx/${txHash}`,
      }),
    {
      onSuccess: mintOptions.onSuccess,
      onError: mintOptions.onError,
    }
  );

  const { isLoading, isError } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: (data) => updateCredential(data.transactionHash),
    onError: mintOptions.onError,
  });

  // Gasless minting
  const { mutateAsync: mintGasless } = useMutation(
    (credential: { id: string; uri?: string }) =>
      gqlAuthMethods.mint_credential({ id: credential.id }),
    mintOptions
  );

  const mintCredential = async (credential: PartialDeep<Credentials>) => {
    try {
      if (me.id !== credential.target_id) {
        throw new Error('You are not the owner of this credential');
      }

      // 2. mint the NFT
      if (isGasless) {
        const { mint_credential } = await mintGasless({ id: credential.id });

        return {
          isMinted: true,
          transactionUrl: mint_credential.info.transaction_hash,
        };
      }

      if (chain.id !== parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)) {
        await switchNetworkAsync?.(parseInt(process.env.NEXT_PUBLIC_CHAIN_ID));
      }

      await contractMint({
        recklesslySetUnpreparedArgs: [address, credential.uri],
      });
    } catch (error) {
      console.log('[Error]:', error);
    }
  };

  return {
    status,
    error,
    mintCredential,
    resetStatus,
  };
};
