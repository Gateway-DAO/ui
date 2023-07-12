import { SocialAuthCard } from '@/components/atoms/social-auth-card';
import { WalletIconsTransition } from '@/components/atoms/wallet-icons-transition';
import { WalletConnectingModal } from '@/components/organisms/wallet-connecting-modal';
import { DashboardTemplate } from '@/components/templates/dashboard';
import { useAddWalletModal } from '@/hooks/wallet/use-add-wallet';
import { Protocol_Api_Chain } from '@/services/hasura/types';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

export default function Dev() {
  // const {} = useAuth();

  return (
    <DashboardTemplate>
      <AddWalletCard chain={Protocol_Api_Chain.Evm} />
      <AddWalletCard chain={Protocol_Api_Chain.Sol} />
    </DashboardTemplate>
  );
}

function AddWalletCard({ chain }: { chain: Protocol_Api_Chain }) {
  const { onRequestWalletSignature, step } = useAddWalletModal();
  const { setVisible } = useWalletModal();
  const { openConnectModal } = useConnectModal();

  const onClick = () => {
    if (chain === Protocol_Api_Chain.Evm) {
      openConnectModal();
    }
    if (chain === Protocol_Api_Chain.Sol) {
      setVisible(true);
    }
  };

  return (
    <>
      <SocialAuthCard
        icon={<WalletIconsTransition network={chain} />}
        title={`${
          chain === Protocol_Api_Chain.Evm ? 'Ethereum' : 'Solana'
        } Wallet`}
        description="See address, account balance, activity and suggest transactions to approve."
        connectHandler={{
          connect: onClick,
          isConnected: false,
          isLoading: false,
          disconnect: () => {
            console.log('disconnect wallet');
          },
        }}
      />
      <WalletConnectingModal step={step} />
    </>
  );
}
