import { ReactNode } from 'react';

import { useWallet } from '@solana/wallet-adapter-react';
import { useAccount, useNetwork } from 'wagmi';

import { icons } from './wallet-icons';

type UseConnectedWallet = Partial<{
  address: string;
  type: 'solana' | 'evm';
  chainName: string;
  adapter: Partial<{
    id: string;
    name: string;
    icon: ReactNode;
  }>;
}>;

function useSolanaWallet(): UseConnectedWallet {
  const { wallet, publicKey } = useWallet();

  return {
    address: publicKey?.toString(),
    type: 'solana',
    chainName: 'Solana',
    adapter: wallet?.adapter
      ? {
          id: wallet?.adapter?.name,
          name: wallet?.adapter?.name,
          icon: <img src={wallet.adapter.icon} alt={wallet.adapter.name} />,
        }
      : undefined,
  };
}

function useEvmWallet(): UseConnectedWallet {
  const { address, connector } = useAccount();
  const { chain } = useNetwork();

  return {
    chainName: chain?.name,
    type: 'evm',
    address,
    adapter: connector
      ? {
          id: connector.id,
          name: connector.name,
          icon: icons[connector.id],
        }
      : undefined,
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
