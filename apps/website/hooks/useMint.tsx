/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

// Web3
import { Biconomy } from '@biconomy/mexa';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';

import { CREDENTIAL_ABI } from '../constants/web3';

let biconomy;
let contract: ethers.Contract, contractInterface: ethers.ContractInterface;

/**
 * It creates a biconomy provider, signs the transaction and sends it to the contract
 * @param {string | null} [contractAddress=null] - The address of the contract you want to interact
 * with.
 */
export function useBiconomyMint(contractAddress: string | null = null) {
  // From Wagmi
  const { data: address } = useAccount();

  // State
  const metaTxEnabled = true;
  const [loading, setLoading] = useState<boolean>(false);
  const [minted, setMinted] = useState<boolean>(false);

  useEffect(() => {
    async function init() {
      if (
        // TODO: check if we can use Wagmi's provider instead
        typeof window.ethereum !== 'undefined' &&
        window.ethereum.isMetaMask
      ) {
        // We're creating biconomy provider linked to your network of choice where your contract is deployed
        const jsonRpcProvider = new ethers.providers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_WEB3_POLYGON_RPC
        );

        biconomy = new Biconomy(jsonRpcProvider, {
          walletProvider: window.ethereum,
          apiKey: process.env.NEXT_PUBLIC_WEB3_BICONOMY_API_KEY,
          debug: true,
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
  }, []);

  /**
   * It mints a new NFT token.
   * @param [token_uri] - This is the metadata that you want to attach to the token.
   * @returns A boolean value.
   */
  const mint = async (token_uri = ''): Promise<boolean> => {
    if (contract) {
      try {
        if (metaTxEnabled) {
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
            gasLimit: gasLimit,
            signatureType: 'EIP712_SIGN',
          };
          let tx;
          try {
            tx = await provider.send('eth_sendTransaction', [txParams]);
          } catch (err) {
            console.log('handle errors like signature denied here');
            console.log(err);
          }

          console.log('Transaction hash : https://polygonscan.com/tx/' + tx);

          //event emitter methods
          provider.once(tx, (transaction) => {
            console.log(transaction);
          });
        } else {
          console.log('Sending normal transaction');

          const tx = await contract.mint(address.address, token_uri);

          console.log(
            'Transaction hash : https://polygonscan.com/tx/' + tx.hash
          );

          const confirmation = await tx.wait();
          console.log(confirmation);
        }

        setMinted(true);
        return true;
      } catch (error) {
        console.log(error);
      }
    }

    setMinted(false);
    return false;
  };

  return {
    mint,
    loading,
    minted,
  };
}
