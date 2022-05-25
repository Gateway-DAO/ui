import { useEffect, useState } from 'react';

import { AnimatePresence } from 'framer-motion';
import { useQuery } from 'react-query';
import { useConnect, useAccount } from 'wagmi';

import { MotionBox } from '@gateway/ui';

import { Box, CircularProgress, DialogTitle } from '@mui/material';

import { gqlMethodsClient } from '../../../services/api';

export function ConnectedWallet() {
  const { activeConnector } = useConnect();
  const { data, isError, isLoading, isSuccess } = useAccount();

  const [count, setCount] = useState(0);

  const nonce = useQuery(
    [data?.address, 'nonce'],
    () => gqlMethodsClient.get_nonce({ wallet: data.address! }),
    {
      enabled: isSuccess && !!data.address,
    }
  );

  console.table(nonce);

  return (
    <Box>
      <DialogTitle sx={{ textAlign: 'center' }}>
        Connecting using {activeConnector.name}
      </DialogTitle>
      <Box
        sx={{
          height: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress color="success" />
      </Box>
      <Box
        sx={{
          height: 36,
          paddingX: 2,
          paddingBottom: 4,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <AnimatePresence>
            <MotionBox
              key={count}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ ease: 'easeInOut' }}
              sx={{ position: 'absolute', textAlign: 'center', width: '100%' }}
            >
              Test {count}
            </MotionBox>
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
}
