import { EvmWalletsProvider } from './evm-provider';
import { SolanaWalletsProvider } from './solana-provider';

export function WalletProvider({ children }) {
  return (
    <EvmWalletsProvider>
      <SolanaWalletsProvider>{children}</SolanaWalletsProvider>
    </EvmWalletsProvider>
  );
}
