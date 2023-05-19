import { useCallback, useEffect } from 'react';

import { useAuth } from '@/providers/auth';
import { useToggle } from 'react-use';

/* PAuthenticated only method execution,  */
export function useProtected(protectedCallback: (...e: any[]) => void) {
  const [isHanging, toggleHanging] = useToggle(false);
  const { me, onOpenLogin } = useAuth();

  const method = useCallback(
    (...e: any[]) => {
      if (!me) {
        onOpenLogin();
        toggleHanging(true);
        return;
      }
      protectedCallback(...e);
    },
    [me, protectedCallback, onOpenLogin, toggleHanging]
  );

  useEffect(() => {
    if (isHanging && me) {
      protectedCallback();
      toggleHanging(false);
    }
    if (isHanging && !me) {
      toggleHanging(false);
    }
  }, [protectedCallback, isHanging, me, toggleHanging]);

  return method;
}
