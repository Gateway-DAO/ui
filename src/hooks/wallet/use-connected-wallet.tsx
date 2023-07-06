import { ReactNode } from 'react';

import { Protocol_Api_Chain } from '@/services/hasura/types';
import { useWallet } from '@solana/wallet-adapter-react';
import base58 from 'bs58';
import { useAccount, useNetwork, useSignMessage } from 'wagmi';

import { icons } from './wallet-icons';

type UseConnectedWallet = Partial<
  {
    address: string;
    chainName: string;
    adapter: Partial<{
      id: string;
      name: string;
      icon: ReactNode;
    }>;
  } & (
    | {
        chain: Protocol_Api_Chain.Evm;
        signMessage: (message: string) => Promise<`0x${string}`>;
      }
    | {
        chain: Protocol_Api_Chain.Sol;
        signMessage: (message: string) => Promise<Uint8Array>;
      }
  )
>;

function useSolanaWallet(): UseConnectedWallet {
  const { wallet, publicKey, signMessage } = useWallet();

  return {
    address: publicKey?.toString(),
    chainName: 'Solana',
    chain: Protocol_Api_Chain.Sol,
    adapter: wallet?.adapter
      ? {
          id: wallet?.adapter?.name,
          name: wallet?.adapter?.name,
          icon: <img src={wallet.adapter.icon} alt={wallet.adapter.name} />,
        }
      : undefined,
    signMessage: (message: string) => signMessage(base58.decode(message)),
  };
}

function useEvmWallet(): UseConnectedWallet {
  const { address, connector } = useAccount();
  const { chain } = useNetwork();
  const { signMessageAsync } = useSignMessage();

  return {
    chainName: chain?.name,
    address,
    chain: Protocol_Api_Chain.Evm,
    adapter: connector
      ? {
          id: connector.id,
          name: connector.name,
          icon: icons[connector.id],
        }
      : undefined,
    signMessage: (message: string) => signMessageAsync({ message }),
  };
}

export function useConnectedWallet(): null | UseConnectedWallet {
  const solana = useSolanaWallet();
  const evm = useEvmWallet();

  if (evm.address) {
    return evm;
  }

  if (solana.address) {
    return solana;
  }

  return null;
}
