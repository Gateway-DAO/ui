import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ConnectButtonRendererProps } from '@rainbow-me/rainbowkit/dist/components/ConnectButton/ConnectButtonRenderer';

import { ROUTES } from '../../constants/routes';

export function BlockedPage({ isBlocked }) {
  if (!isBlocked) return null;

  return (
    <ConnectButton.Custom>
      {(props) => <BlockedPageHandler {...props} />}
    </ConnectButton.Custom>
  );
}

function BlockedPageHandler({
  openConnectModal,
  connectModalOpen,
}: Parameters<ConnectButtonRendererProps['children']>[0]) {
  const router = useRouter();
  const [hasOpened, setHasOpened] = useState(false);
  const session = useSession();

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      if (hasOpened && !connectModalOpen) {
        router.replace(ROUTES.EXPLORE);
      }
      if (!hasOpened) {
        openConnectModal();
        setHasOpened(true);
      }
    }
  }, [connectModalOpen, hasOpened, openConnectModal, router, session.status]);
  return <></>;
}
