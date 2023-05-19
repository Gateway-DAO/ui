import { useSession } from 'next-auth/react';

import { LoadingButton } from '@/components/atoms/loading-button';
import { useAuth } from '@/providers/auth';

import { NavBarAvatar } from './navbar-avatar';
import { NavBarNotifications } from './navbar-notifications/navbar-notifications';

export function ClientNav() {
  const { onOpenLogin, me } = useAuth();

  const session = useSession();

  if (typeof window !== 'undefined' && me) {
    return (
      <>
        <NavBarNotifications />
        <NavBarAvatar />
      </>
    );
  }

  return (
    <>
      <LoadingButton
        isLoading={session.status === 'loading'}
        variant="outlined"
        color="secondary"
        onClick={onOpenLogin}
      >
        Connect Wallet
      </LoadingButton>
    </>
  );
}
