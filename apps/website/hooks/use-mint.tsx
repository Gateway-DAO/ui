/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

// Web3
import { Biconomy } from '@biconomy/mexa';
import { ethers } from 'ethers';
import { useMutation } from 'react-query';
import { PartialDeep } from 'type-fest';
import { useAccount, chain, useSigner, useNetwork } from 'wagmi';

import { CREDENTIAL_ABI } from '../constants/web3';
import { useAuth } from '../providers/auth';
import { gqlMethods } from '../services/api';
import { Credentials } from '../services/graphql/types.generated';
import { useSnackbar } from './use-snackbar';

let biconomy;
let contract: ethers.Contract, contractInterface: ethers.ContractInterface;

/**
 * It mints a new NFT token
 * @param {string | null} contractAddress - This is the address of the contract that you want to
 * interact with.
 * @returns It returns an object with the following properties:
 * - mint: A function that mints a new NFT token.
 * - loading: A boolean value that indicates if the minting process is in progress.
 * - minted: A boolean value that indicates if the minting process was successful.
 */
export function useMint(
  contractAddress: string | null = process.env.NEXT_PUBLIC_WEB3_NFT_ADDRESS
) {
  // From Wagmi
  const { data: address } = useAccount();
  const { data: signer } = useSigner();
  const { activeChain } = useNetwork();

  // State
  const [loading, setLoading] = useState<boolean>(false);
  const [minted, setMinted] = useState<boolean>(false);
  const [asksSignature, setAsksSignature] = useState<boolean>(false);

  // Snackbar
  const snackbar = useSnackbar();

  // Effects
  useEffect(() => {
    /* It creates a new contract instance with the contract address, ABI and signer. */
    contract = new ethers.Contract(contractAddress, CREDENTIAL_ABI, signer);

    contractInterface = new ethers.utils.Interface(CREDENTIAL_ABI);
  }, [address, activeChain]);

  /**
   * It mints a new NFT token.
   * @param [token_uri] - This is the metadata that you want to attach to the token.
   * @returns A boolean value.
   */
  async function mint(token_uri = ''): Promise<boolean> {
    setLoading(true);

    if (!(await switchToPolygon())) {
      return false;
    }

    if (contract) {
      try {
        const promise = contract.mint(address.address, token_uri);

        setAsksSignature(true);

        const tx = await promise;

        setAsksSignature(false);

        const confirmation = await tx.wait();

        setLoading(false);
        setMinted(true);
        return true;
      } catch (error) {
        console.log(error);
      }
    }

    setLoading(false);
    setMinted(false);
    return false;
  }

  /**
   * It switches the user's wallet to the Polygon network
   * @returns A boolean value.
   */
  const switchToPolygon = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${(137).toString(16)}` }],
      });
      return true;
    } catch (error) {
      console.log(error);
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x' + (137).toString(16),
                chainName: chain.polygon.name.toString(),
                nativeCurrency: chain.polygon.nativeCurrency,
                rpcUrls: [chain.polygon.rpcUrls.default],
                blockExplorerUrls: [chain.polygon.blockExplorers.default.url],
              },
            ],
          });
          return true;
        } catch (error) {
          return false;
        }
      } else {
        return false;
      }
    }
  };

  return {
    mint,
    loading,
    minted,
    asksSignature,
  };
}

/**
 * It creates a biconomy provider, signs the transaction and sends it to the contract
 * @param {string | null} contractAddress - The address of the contract you want to interact
 * with.
 */
export function useBiconomyMint(
  contractAddress: string | null = process.env.NEXT_PUBLIC_WEB3_NFT_ADDRESS,
  isMainnet: boolean = process.env.NODE_ENV === 'production'
) {
  // From Wagmi
  const { data: address } = useAccount();

  // State
  const metaTxEnabled = true;
  const [loading, setLoading] = useState<boolean>(false);
  const [minted, setMinted] = useState<boolean>(false);
  const [asksSignature, setAsksSignature] = useState<boolean>(false);

  // Snackbar
  const snackbar = useSnackbar();

  // User info
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
        window.ethereum.isMetaMask &&
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
  const mint = async (
    token_uri = ''
  ): Promise<{
    isMinted: boolean;
    polygonURL?: string;
    error?: any;
  }> => {
    if (contract) {
      try {
        if (metaTxEnabled) {
          setLoading(true);
          let tx;

          const { data: contractData } =
            await contract.populateTransaction.mint(address.address, token_uri);

          const provider = biconomy.getEthersProvider();
          const gasLimit = await provider.estimateGas({
            to: contractAddress,
            from: address.address,
            data: contractData,
          });

          const txParams = {
            data: contractData,
            to: contractAddress,
            from: address.address,
            gasLimit: gasLimit * 3,
            signatureType: 'EIP712_SIGN',
          };

          try {
            setAsksSignature(true);
            const promise = provider.send('eth_sendTransaction', [txParams]);
            setAsksSignature(false);
            tx = await promise;
          } catch (err) {
            throw new Error('Minting failed! Try again later.');
          }

          setMinted(true);

          return {
            isMinted: true,
            polygonURL:
              (isMainnet
                ? 'https://polygonscan.com'
                : 'https://rinkeby.etherscan.io') +
              '/tx/' +
              tx,
          };
        } else {
          const tx = await contract.mint(address.address, token_uri);

          await tx.wait();

          setMinted(true);
          setLoading(false);

          return {
            isMinted: true,
            polygonURL:
              (isMainnet
                ? 'https://polygonscan.com'
                : 'https://rinkeby.etherscan.io') +
              '/tx/' +
              tx.hash,
          };
        }
      } catch (error) {
        snackbar.onOpen({ message: error.message || error, type: 'error' });
        console.log('[useMint] Error:', error);

        setMinted(false);
        setLoading(false);

        return {
          isMinted: false,
          error,
        };
      }
    } else {
      snackbar.onOpen({
        message: 'Biconomy is still loading. Try again in a few minutes!',
        type: 'warning',
      });
    }

    setMinted(false);

    return {
      isMinted: false,
    };
  };

  const mintCredential = async (
    credential: PartialDeep<Credentials>
  ): Promise<{
    isMinted: boolean;
    polygonURL?: string;
    error?: any;
  }> => {
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
        tx_url: res.polygonURL,
      });

      return res;
    } catch (error) {
      console.log('[useMint] Error:', error);

      setMinted(false);

      return {
        isMinted: false,
        error,
      };
    }
  };

  return {
    mint,
    mintCredential,
    loading,
    minted,
    snackbar,
    asksSignature,
  };
}

export default useMint;
