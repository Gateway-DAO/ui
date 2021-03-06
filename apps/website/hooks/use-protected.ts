import { useCallback, useEffect } from 'react';

import { useToggle } from 'react-use';

import { useAuth } from '../providers/auth';

/* PAuthenticated only method execution,  */
export function useProtected(protectedCallback: (...e: any[]) => void) {
  const [isHanging, toggleHanging] = useToggle(false);
  const { status, onOpenLogin } = useAuth();

  const method = useCallback(
    (...e: any[]) => {
      if (status !== 'AUTHENTICATED') {
        onOpenLogin();
        toggleHanging(true);
        return;
      }
      protectedCallback(...e);
    },
    [status, protectedCallback, onOpenLogin, toggleHanging]
  );

  useEffect(() => {
    if (isHanging && status === 'AUTHENTICATED') {
      protectedCallback();
      toggleHanging(false);
    }
    if (isHanging && status == 'UNAUTHENTICATED') {
      toggleHanging(false);
    }
  }, [protectedCallback, isHanging, status, toggleHanging]);

  return method;
}
