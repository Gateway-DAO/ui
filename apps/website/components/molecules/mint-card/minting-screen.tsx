import { Button, CircularProgress } from '@mui/material';
import { GatewayGrayIcon } from '@gateway/assets';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { AnimatePresence } from 'framer-motion';
import { AnimatedMessage } from '../../organisms/wallet-modal/animated-message';
import { Check, Close } from '@mui/icons-material';
import { Subjects } from './index';

export function MintingScreen({ setmintProcessStatus }) {
  const [status, setStatus] = useState('FAILED');
  if (status === 'SUCCESSFUL') {
    setTimeout(() => {
      setmintProcessStatus(Subjects.minted);
    }, 1000);
  }
  return (
    <>
      <GatewayGrayIcon
        sx={{
          width: 28,
          height: 28,
          m: 2,
        }}
      />
      <Box
        sx={{
          width: 300,
          height: 300,
          backgroundColor: 'primary',
          '&:hover': {
            backgroundColor: 'primary',
            opacity: [0.9, 0.8, 0.7],
          },
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {status !== 'SUCCESSFUL' && status !== 'FAILED' && (
          <CircularProgress
            color="secondary"
            sx={{
              height: 60,
              width: 60,
              mb: 2,
              p: 1,
              bgcolor: 'primary.light',
              borderRadius: '50%',
            }}
          />
        )}

        {status == 'SUCCESSFUL' && (
          <Check
            sx={{
              height: 40,
              width: 40,
              mb: 2,
              p: 1,
              color: 'primary.dark',
              bgcolor: 'success.main',
              borderRadius: '50%',
            }}
          />
        )}

        {status == 'FAILED' && (
          <Close
            sx={{
              height: 40,
              width: 40,
              mb: 2,
              p: 1,
              color: 'primary',
              bgcolor: 'error.main',
              borderRadius: '50%',
            }}
          />
        )}

        <Box sx={{ width: 200, position: 'relative' }}>
          <AnimatePresence>
            {status === 'SIGN_IN' && (
              <AnimatedMessage key="signin">
                Please sign the transaction
              </AnimatedMessage>
            )}
            {status === 'MINTING' && (
              <AnimatedMessage key="account">
                Minting credential
              </AnimatedMessage>
            )}
            {status === 'SUCCESSFUL' && (
              <AnimatedMessage key="successful">
                Credential successfully minted as NFT
              </AnimatedMessage>
            )}
            {status === 'FAILED' && (
              <AnimatedMessage key="failed">
                Something went wrong on minting
              </AnimatedMessage>
            )}
          </AnimatePresence>
        </Box>
      </Box>
      {status === 'FAILED' && (
        <Box sx={{ m: 2 }}>
          <Button
            size="large"
            variant="contained"
            fullWidth
            onClick={() => setmintProcessStatus(Subjects.start)}
          >
            RETRY MINT AS NFT
          </Button>
        </Box>
      )}
    </>
  );
}
