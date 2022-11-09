import { useEffect } from 'react';

import { io } from 'socket.io-client';
const socket = io(process.env.NEXT_PUBLIC_NODE_ENDPOINT);
export function DirectWallets() {
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);
  return <></>;
}
