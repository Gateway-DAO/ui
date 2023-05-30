import { useRef, useState } from 'react';

import { CREDENTIAL_ABI } from '@/constants/web3';
import { Credentials } from '@/services/hasura/types';
import { getExplorer } from '@/utils/web3';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BigNumber } from 'ethers';
import { useSnackbar } from 'notistack';
import { PartialDeep } from 'type-fest';
import {
  useAccount,
  useContractWrite,
  useNetwork,
  useSwitchNetwork,
  useWaitForTransaction,
} from 'wagmi';

import { useAuth } from '../auth';
import { BiconomyContext, MintResponse } from './context';

type ProviderProps = {
  children: React.ReactNode;
};

export type MintStatus = {
  [key: string]: {
    askingSignature: boolean;
    isMinted: boolean;
    minting: boolean;
    error: any;
  };
};

const isGasless = process.env.NEXT_PUBLIC_GASLESS_MINTING === 'true';

export function BiconomyProvider({ children }: ProviderProps) {
  // State
  const [mintStatus, setMintStatus] = useState<MintStatus>(() => ({}));
  const currentCredential = useRef<PartialDeep<Credentials> | null>(null);

  // Credential update
  const queryClient = useQueryClient();

  const mintOptions = {
    onMutate: (variables) => {
      setMintStatus((prev) => ({
        ...prev,
        [variables.id]: {
          askingSignature: !isGasless,
          minting: isGasless,
          isMinted: false,
          error: null,
        },
      }));
    },
    onSuccess: (data, variables) => {
      setMintStatus((prev) => ({
        ...prev,
        [variables.id]: {
          askingSignature: false,
          minting: false,
          isMinted: true,
          error: null,
        },
      }));

      queryClient.resetQueries(['credentials']);
      queryClient.resetQueries(['credential', variables.id]);

      queryClient.resetQueries(['user_info', me?.id]);

      currentCredential.current = null;
    },
    onError: (error, variables) => {
      enqueueSnackbar('Minting failed, please try again', {
        variant: 'error',
      });

      setMintStatus((prev) => ({
        ...prev,
        [variables.id]: {
          askingSignature: false,
          minting: false,
          isMinted: false,
          error,
        },
      }));

      console.log('[useMint] Error:', error);
    },
  };

  // From Wagmi
  const { address } = useAccount();
  const { chain } = useNetwork();

  const { switchNetworkAsync } = useSwitchNetwork({
    throwForSwitchChainNotSupported: true,
  });

  const { writeAsync: contractMint, data } = useContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: CREDENTIAL_ABI,
    functionName: 'mint',
    mode: 'recklesslyUnprepared',
    overrides: {
      gasLimit: BigNumber.from(300000),
    },
    onMutate: () => mintOptions.onMutate({ id: currentCredential.current?.id }),
    onSuccess: () => {
      setMintStatus((prev) => ({
        ...prev,
        [currentCredential.current?.id]: {
          askingSignature: false,
          minting: true,
          isMinted: false,
          error: null,
        },
      }));
    },
    onError: (err) =>
      mintOptions.onError(err, { id: currentCredential.current?.id }),
  });

  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: (data) =>
      updateCredential({
        id: currentCredential.current?.id,
        uri: currentCredential.current?.uri,
        txHash: data.transactionHash,
      }),
    onError: (err) =>
      mintOptions.onError(err, { id: currentCredential.current?.id }),
  });

  // From auth
  const { me, gqlAuthMethods } = useAuth();

  const { enqueueSnackbar } = useSnackbar();

  // Mint - backend
  const { mutateAsync: mintGasless } = useMutation(
    (credential: { id: string; uri?: string }) =>
      gqlAuthMethods.mint_credential({ id: credential.id }),
    mintOptions
  );

  const { mutateAsync: updateCredential } = useMutation(
    (credential: { id: string; uri?: string; txHash?: string }) =>
      gqlAuthMethods.update_credential_status({
        id: credential?.id,
        status: 'minted',
        transaction_url: `${getExplorer(
          parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)
        )}/tx/${credential.txHash}`,
      }),
    {
      onSuccess: mintOptions.onSuccess,
      onError: mintOptions.onError,
    }
  );

  const mintCredential = async (
    credential: PartialDeep<Credentials>
  ): Promise<MintResponse> => {
    try {
      if (me.id !== credential.target_id) {
        throw new Error('You are not the owner of this credential');
      }

      currentCredential.current = credential;

      if (chain.id !== parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)) {
        await switchNetworkAsync?.(parseInt(process.env.NEXT_PUBLIC_CHAIN_ID));
      }

      // 2. mint the NFT
      if (isGasless) {
        const { mint_credential } = await mintGasless({ id: credential.id });

        return {
          isMinted: true,
          transactionUrl: mint_credential.info.transaction_hash,
        };
      }

      await contractMint({
        recklesslySetUnpreparedArgs: [address, credential.uri],
      });
    } catch (error) {
      console.log('[Error]:', error);
    }
  };

  return (
    <BiconomyContext.Provider
      value={{
        mintCredential,
        mintStatus,
      }}
    >
      {children}
    </BiconomyContext.Provider>
  );
}
