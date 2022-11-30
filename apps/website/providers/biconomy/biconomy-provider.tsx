import { PropsWithChildren, useEffect, useState } from 'react';

import { Biconomy } from '@biconomy/mexa';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { useSnackbar } from 'notistack';
import { PartialDeep } from 'type-fest';
import { useAccount, useProvider, useSigner } from 'wagmi';

import { CREDENTIAL_ABI } from '../../constants/web3';
import { Credentials, Users } from '../../services/graphql/types.generated';
import { useAuth } from '../auth';
import { BiconomyContext, MintResponse } from './context';

type Props = {
  apiKey: string;
  contractAddress: string;
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

const correctProvider = async () => {
  if (typeof window.ethereum !== 'undefined') {
    provider = window.ethereum;

    // edge case if MM and CBW are both installed
    if (window.ethereum?.providers?.length) {
      window.ethereum.providers.forEach(async (p) => {
        if (p.isMetaMask) provider = p;
      });
    }

    await provider.request({
      method: 'eth_requestAccounts',
      params: [],
    });
  }

  return provider;
};

export function BiconomyProvider({
  apiKey,
  contractAddress,
  children,
}: PropsWithChildren<Props>) {
  const RPC = {
    polygon: process.env.NEXT_PUBLIC_WEB3_POLYGON_RPC,
    goerli: process.env.NEXT_PUBLIC_WEB3_GOERLI_RPC,
  };

  // State
  const [mintStatus, setMintStatus] = useState<MintStatus>(() => ({}));

  // From Wagmi
  const { address } = useAccount();

  // From auth
  const { me, gqlAuthMethods } = useAuth();

  const { enqueueSnackbar } = useSnackbar();

  // Credential update
  const queryClient = useQueryClient();

  // Mint - backend
  const { mutateAsync: mintGasless } = useMutation(
    (id: string) => gqlAuthMethods.mint_credential({ id }),
    {
      onSuccess: (data, id) => {
        queryClient.invalidateQueries(['credentials']);
        queryClient.invalidateQueries(['credential', id]);

        queryClient.resetQueries(['user_info', me?.id]);
      },
    }
  );

  /**
   * It mints a new NFT token.
   * @param [token_uri] - This is the metadata that you want to attach to the token.
   * @returns A boolean value.
   */
  const mint = async (token_uri = ''): Promise<MintResponse> => {
    try {
      if (contract) {
        let tx: string;

        const { data: contractData } = await contract.populateTransaction.mint(
          address,
          token_uri
        );

        const provider: ethers.providers.Web3Provider =
          biconomy.getEthersProvider();
        const gasLimit = await provider.estimateGas({
          to: contractAddress,
          from: address,
          data: contractData,
        });

        const txParams = {
          data: contractData,
          to: contractAddress,
          from: address,
          gasLimit: gasLimit.toNumber() * 3,
          signatureType: 'EIP712_SIGN',
        };

        try {
          setMintStatus((prev) => ({
            ...prev,
            [token_uri]: {
              askingSignature: true,
              isMinted: false,
              error: null,
            },
          }));

          const promise = provider.send('eth_sendTransaction', [txParams]);

          setMintStatus((prev) => ({
            ...prev,
            [token_uri]: {
              askingSignature: false,
              isMinted: false,
              error: null,
            },
          }));

          tx = await promise;

          setMintStatus((prev) => ({
            ...prev,
            [token_uri]: {
              askingSignature: false,
              isMinted: true,
              error: null,
            },
          }));
        } catch (err) {
          enqueueSnackbar('Minting failed, please try again', {
            variant: 'error',
          });

          setMintStatus((prev) => ({
            ...prev,
            [token_uri]: {
              askingSignature: false,
              isMinted: true,
              error: err,
            },
          }));

          return {
            isMinted: false,
            error: err,
          };
        }

        return {
          isMinted: true,
          transactionUrl:
            (process.env.NEXT_PUBLIC_MINT_CHAIN === 'polygon'
              ? 'https://polygonscan.com'
              : 'https://goerli.etherscan.io') +
            '/tx/' +
            tx,
        };
      } else {
        enqueueSnackbar(
          'Biconomy is still loading. Try again in a few minutes!',
          {
            variant: 'warning',
          }
        );
        return {
          isMinted: false,
          error: 'Biconomy is still loading. Try again in a few minutes!',
        };
      }
    } catch (err) {
      console.log(err);
    }
  };

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
      console.log('[useMint] Error:', error);

      return {
        isMinted: false,
        error,
      };
    }
  };

  return (
    <BiconomyContext.Provider
      value={{
        mint,
        mintCredential,
        mintStatus,
      }}
    >
      {children}
    </BiconomyContext.Provider>
  );
}
