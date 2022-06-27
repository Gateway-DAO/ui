import { Button } from '@mui/material';

import { useAuth } from '../../../providers/auth';
import { NavBarAvatar } from './navbar-avatar';
import { NavBarNotifications } from './navbar-notifications';

export function ClientNav() {
  const { onOpenLogin, status } = useAuth();
  return (
    <>
      {status === 'AUTHENTICATED' && typeof window !== 'undefined' ? (
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
