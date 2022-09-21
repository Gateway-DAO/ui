import { Button } from '@mui/material';

import { useAuth } from '../../../providers/auth';
import { NavBarAvatar } from './navbar-avatar';
import { NavBarNotifications } from './navbar-notifications/navbar-notifications';

export function ClientNav() {
  const { onOpenLogin, me } = useAuth();
  return (
    <>
      {typeof window !== 'undefined' && me ? (
        <>
          <NavBarNotifications />
          <NavBarAvatar />
        </>
      ) : (
        <>
          <Button variant="outlined" color="secondary" onClick={onOpenLogin}>
            Connect Wallet
          </Button>
        </>
      )}
    </>
  );
}
