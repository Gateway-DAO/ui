import { PropsWithChildren, useEffect, useState } from 'react';

import { Biconomy } from '@biconomy/mexa';
import { ethers } from 'ethers';
import { useMutation } from 'react-query';
import { PartialDeep } from 'type-fest';
import { useAccount } from 'wagmi';

import { CREDENTIAL_ABI } from '../../constants/web3';
import { Credentials } from '../../services/graphql/types.generated';
import { useAuth } from '../auth';
import { BiconomyContext, MintResponse } from './context';

type Props = {
  apiKey: string;
  contractAddress: string;
};

export let biconomy: Biconomy;
export let contract: ethers.Contract;
export let contractInterface: ethers.ContractInterface;

export type MintStatus = {
  [key: string]: {
    askingSignature: boolean;
    isMinted: boolean;
  };
};

export function BiconomyProvider({
  apiKey,
  contractAddress,
  children,
}: PropsWithChildren<Props>) {
  const isMainnet: boolean = process.env.NODE_ENV === 'production';

  // State
  const [mintStatus, setMintStatus] = useState<MintStatus>(() => ({}));

  // From Wagmi
  const { data: address } = useAccount();

  // From auth
  const { me, gqlAuthMethods } = useAuth();

  // Credential update
  const { mutateAsync: updateCredential } = useMutation(
    async (data: { id: string; tx_url: string }) => {
      return await gqlAuthMethods.update_credential_status({
        id: data.id,
        status: 'minted',
        transaction_url: data.tx_url,
      });
    }
  );

  useEffect(() => {
    async function init() {
      if (
        // TODO: check if we can use Wagmi's provider instead
        typeof window.ethereum !== 'undefined' &&
        address.address
      ) {
        // We're creating biconomy provider linked to your network of choice where your contract is deployed
        const jsonRpcProvider = new ethers.providers.JsonRpcProvider(
          isMainnet
            ? process.env.NEXT_PUBLIC_WEB3_POLYGON_RPC
            : process.env.NEXT_PUBLIC_WEB3_RINKEBY_RPC
        );

        biconomy = new Biconomy(jsonRpcProvider, {
          walletProvider: window.ethereum,
          apiKey: process.env.NEXT_PUBLIC_WEB3_BICONOMY_API_KEY,
          debug: process.env.NODE_ENV === 'development',
        });

        biconomy
          .onEvent(biconomy.READY, async () => {
            // Initialize your dapp here like getting user accounts etc
            contract = new ethers.Contract(
              contractAddress,
              CREDENTIAL_ABI,
              biconomy.getSignerByAddress(address.address)
            );

            contractInterface = new ethers.utils.Interface(CREDENTIAL_ABI);
          })
          .onEvent(biconomy.ERROR, (error, message) => {
            // Handle error while initializing mexa
            console.log(message);
            console.log(error);
          });
      } else {
        throw new Error('Metamask not installed!');
      }
    }

    init();
  }, [address]);

  /**
   * It mints a new NFT token.
   * @param [token_uri] - This is the metadata that you want to attach to the token.
   * @returns A boolean value.
   */
  const mint = async (token_uri = ''): Promise<MintResponse> => {
    if (contract) {
      let tx;

      const { data: contractData } = await contract.populateTransaction.mint(
        address.address,
        token_uri
      );

      const provider: ethers.providers.Web3Provider =
        biconomy.getEthersProvider();
      const gasLimit = await provider.estimateGas({
        to: contractAddress,
        from: address.address,
        data: contractData,
      });

      const txParams = {
        data: contractData,
        to: contractAddress,
        from: address.address,
        gasLimit: gasLimit.toNumber() * 3,
        signatureType: 'EIP712_SIGN',
      };

      try {
        setMintStatus((prev) => ({
          ...prev,
          [token_uri]: {
            askingSignature: true,
            isMinted: false,
          },
        }));
        const promise = provider
          .send('eth_sendTransaction', [txParams])
          .then(() =>
            setMintStatus((prev) => ({
              ...prev,
              [token_uri]: {
                askingSignature: false,
                isMinted: false,
              },
            }))
          );
        tx = await promise;

        setMintStatus((prev) => ({
          ...prev,
          [token_uri]: {
            askingSignature: false,
            isMinted: true,
          },
        }));
      } catch (err) {
        throw new Error('Minting failed! Try again later.');
      }

      return {
        isMinted: true,
        transactionUrl:
          (isMainnet
            ? 'https://polygonscan.com'
            : 'https://rinkeby.etherscan.io') +
          '/tx/' +
          tx,
      };
    } else {
      // snackbar.onOpen({
      //   message: 'Biconomy is still loading. Try again in a few minutes!',
      //   type: 'warning',
      // });
      console.log('Biconomy is still loading. Try again in a few minutes!');
    }
  };

  const mintCredential = async (
    credential: PartialDeep<Credentials>
  ): Promise<MintResponse> => {
    try {
      // 1. verify is the user owns the credential
      if (credential.target_id !== me.id) {
        throw new Error('You are not the owner of this credential!');
      }

      // 2. mint the NFT
      const res = await mint(credential?.uri || '');

      if (res.error) {
        throw res.error;
      }

      // 3. change the status of the credential
      await updateCredential({
        id: credential.id,
        tx_url: res.transactionUrl,
      });

      return res;
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
