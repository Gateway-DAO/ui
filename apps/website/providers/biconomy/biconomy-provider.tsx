import { useState } from 'react';

import { Biconomy } from '@biconomy/mexa';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { useSnackbar } from 'notistack';
import { PartialDeep } from 'type-fest';

import { Credentials } from '../../services/graphql/types.generated';
import { useAuth } from '../auth';
import { BiconomyContext, MintResponse } from './context';

type ProviderProps = {
  children: React.ReactNode;
};

let provider;
export let biconomy: Biconomy;
export let contract: ethers.Contract;
export let contractInterface: ethers.ContractInterface;

export type MintStatus = {
  [key: string]: {
    askingSignature: boolean;
    isMinted: boolean;
    error: any;
  };
};

export function BiconomyProvider({ children }: ProviderProps) {
  // State
  const [mintStatus, setMintStatus] = useState<MintStatus>(() => ({}));

  // From auth
  const { me, gqlAuthMethods } = useAuth();

  const { enqueueSnackbar } = useSnackbar();

  // Credential update
  const queryClient = useQueryClient();

  // Mint - backend
  const { mutateAsync: mintGasless } = useMutation(
    (id: string) => gqlAuthMethods.mint_credential({ id }),
    {
      onMutate: (id) => {
        setMintStatus((prev) => ({
          ...prev,
          [id]: {
            askingSignature: true,
            isMinted: false,
            error: null,
          },
        }));
      },
      onSuccess: (data, id) => {
        setMintStatus((prev) => ({
          ...prev,
          [id]: {
            askingSignature: false,
            isMinted: true,
            error: null,
          },
        }));

        queryClient.invalidateQueries(['credentials']);
        queryClient.invalidateQueries(['credential', id]);

        queryClient.resetQueries(['user_info', me?.id]);
      },
      onError: (error) => {
        enqueueSnackbar('Minting failed, please try again', {
          variant: 'error',
        });

        console.log('[useMint] Error:', error);
      },
    }
  );

  const mintCredential = async (
    credential: PartialDeep<Credentials>
  ): Promise<MintResponse> => {
    try {
      // 2. mint the NFT
      const { mint_credential: res } = await mintGasless(credential.id);

      return {
        isMinted: true,
        transactionUrl: res.info.transaction_hash,
      };
    } catch (error) {
      return {
        isMinted: false,
        error,
      };
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
