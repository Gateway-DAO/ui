import { ReactNode } from 'react';

import {
  useWallet,
  useConnection,
  useAnchorWallet,
} from '@solana/wallet-adapter-react';
import { useAccount, useNetwork } from 'wagmi';

import { icons } from './wallet-icons';

type UseConnectedWallet = Partial<{
  address: string;
  chainName: string;
  adapter: Partial<{
    id: string;
    name: string;
    icon: ReactNode;
  }>;
}>;

function useSolanaWallet(): UseConnectedWallet {
  const { wallet, publicKey } = useWallet();
  const { connection } = useConnection();

  return {
    address: publicKey?.toString(),
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

export function useConnectedWallet(): UseConnectedWallet | undefined {
  const solana = useSolanaWallet();
  const evm = useEvmWallet();

  if (evm.address) {
    return evm;
  }

  if (solana.address) {
    return solana;
  }

  return undefined;
}
