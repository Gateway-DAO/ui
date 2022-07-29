import { useEffect, useState } from 'react';

import { SessionToken } from '../../types/user';

export type AuthStatus = 'UNAUTHENTICATED' | 'CONNECTING' | 'AUTHENTICATED';

export const useAuthStatus = (token?: SessionToken) => {
  const [status, setStatus] = useState<AuthStatus>(() => {
    if (token) return 'AUTHENTICATED';
    return 'UNAUTHENTICATED';
  });

  useEffect(() => {
    if (!token && status === 'AUTHENTICATED') {
      setStatus('UNAUTHENTICATED');
    }
  }, [token, status]);

  const onConnecting = () => {
    setStatus('CONNECTING');
  };

  const onUnauthenticated = () => {
    setStatus('UNAUTHENTICATED');
  };

  const onAuthenticated = () => {
    setStatus('AUTHENTICATED');
  };

  return { status, onConnecting, onUnauthenticated, onAuthenticated };
};
