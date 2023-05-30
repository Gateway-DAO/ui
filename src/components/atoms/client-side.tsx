import { PropsWithChildren, useEffect, useState } from 'react';

export function ClientSide({ children }: PropsWithChildren<unknown>) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return <>{children}</>;
}
