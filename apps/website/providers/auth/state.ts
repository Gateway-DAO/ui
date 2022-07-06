import { useEffect, useState } from 'react';

import { PartialDeep } from 'type-fest';

import { SessionUser } from '../../types/user';

export type AuthStatus = 'UNAUTHENTICATED' | 'CONNECTING' | 'AUTHENTICATED';

export const useAuthStatus = (me: PartialDeep<SessionUser>) => {
  const [status, setStatus] = useState<AuthStatus>(() => {
    if (me) return 'AUTHENTICATED';
    return 'UNAUTHENTICATED';
  });

  useEffect(() => {
    if (!me && status === 'AUTHENTICATED') {
      setStatus('UNAUTHENTICATED');
    }
  }, [me, status]);

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
