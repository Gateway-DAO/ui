import { useEffect, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { PartialDeep } from 'type-fest';
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useNetwork,
  useSigner,
  useSwitchNetwork,
  useWaitForTransaction,
} from 'wagmi';

import { CREDENTIAL_ABI } from '../../constants/web3';
import {
  Credentials,
  Update_Credential_StatusMutation,
} from '../../services/graphql/types.generated';
import { getExplorer } from '../../utils/web3';
import { useAuth } from '../auth';
import { BiconomyContext, MintResponse } from './context';

type ProviderProps = {
  children: React.ReactNode;
};

export type MintStatus = {
  [key: string]: {
    askingSignature: boolean;
    isMinted: boolean;
    error: any;
  };
};

const isGasless = process.env.NEXT_PUBLIC_GASLESS_MINTING === 'true';

export function BiconomyProvider({ children }: ProviderProps) {
  // State
  const [mintStatus, setMintStatus] = useState<MintStatus>(() => ({}));
  const [currentTokenURI, setTokenURI] = useState<string>();

  // From Wagmi
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { config } = usePrepareContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: CREDENTIAL_ABI,
    chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID),
    functionName: 'mint',
    args: [address, currentTokenURI],
    overrides: {
      gasLimit: 300000,
    },
  });
  const { switchNetworkAsync } = useSwitchNetwork({
    throwForSwitchChainNotSupported: true,
  });

  const { writeAsync: contractMint, data, error } = useContractWrite(config);

  // From auth
  const { me, gqlAuthMethods } = useAuth();

  const { enqueueSnackbar } = useSnackbar();

  // Credential update
  const queryClient = useQueryClient();

  const mintOptions = {
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
      queryClient.resetQueries(['credential', id]);

      queryClient.resetQueries(['user_info', me?.id]);
    },
    onError: (error) => {
      enqueueSnackbar('Minting failed, please try again', {
        variant: 'error',
      });

      console.log('[useMint] Error:', error);
    },
  };

  // Mint - backend
  const { mutateAsync: mintGasless } = useMutation(
    (id: string) => gqlAuthMethods.mint_credential({ id }),
    mintOptions
  );

  // Mint - local
  const { mutateAsync: mint } = useMutation(
    async (
      credential: PartialDeep<Credentials>
    ): Promise<Update_Credential_StatusMutation> => {
      try {
        const tx = await contractMint?.();
        const receipt = await tx?.wait(3);

        // Update credential data
        return await gqlAuthMethods.update_credential_status({
          id: credential.id,
          status: 'minted',
          transaction_url: `${getExplorer(
            parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)
          )}/tx/${receipt?.transactionHash}`,
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    mintOptions
  );

  const mintCredential = async (
    credential: PartialDeep<Credentials>
  ): Promise<MintResponse> => {
    try {
      if (me.id !== credential.target_id) {
        throw new Error('You are not the owner of this credential');
      }

      setTokenURI(credential.uri);

      if (chain.id !== parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)) {
        await switchNetworkAsync?.(parseInt(process.env.NEXT_PUBLIC_CHAIN_ID));
      }

      // 2. mint the NFT
      if (isGasless) {
        const { mint_credential } = await mintGasless(credential.id);

        return {
          isMinted: true,
          transactionUrl: mint_credential.info.transaction_hash,
        };
      }

      const { update_credential_status: res } = await mint(credential);

      return { isMinted: true, transactionUrl: res.transaction_url };
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
