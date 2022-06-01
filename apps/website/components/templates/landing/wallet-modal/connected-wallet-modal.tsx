/* eslint-disable react/no-unescaped-entities */
import { useSession } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { AnimatePresence } from 'framer-motion';
import { useConnect } from 'wagmi';

import { Check, Close } from '@mui/icons-material';
import {
  Box,
  Button,
  Link,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { AnimatedMessage } from './animated-message';
import { useConnectWallet } from './state';

type Props = {
  onBack: () => void;
};

/* TODO: Move this out from here, move to page level */

export function ConnectedWallet({ onBack }: Props) {
  const { activeConnector } = useConnect();
  const { data: session } = useSession();
  const router = useRouter();

  const { step, error, isLoading } = useConnectWallet();

  useEffect(() => {
    if (step === 'FINISHED') {
      router.push('/home');
    }
  }, [step]);

  return (
    <Box>
      <DialogTitle sx={{ textAlign: 'center' }}>
        Connecting using {activeConnector.name}
      </DialogTitle>
      <Box
        sx={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {step === 'FINISHED' && (
          <Check color="success" sx={{ height: 60, width: 60 }} />
        )}
        {step !== 'FINISHED' && !error && (
          <CircularProgress color="success" sx={{ height: 60, width: 60 }} />
        )}
        {!!error && <Close color="error" sx={{ height: 60, width: 60 }} />}
      </Box>
      {isLoading && (
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
              {step === 'GET_ACCOUNT' && (
                <AnimatedMessage key="account">Loading account</AnimatedMessage>
              )}
              {step === 'GET_NONCE' && (
                <AnimatedMessage key="nonce">
                  Checking if you is you
                </AnimatedMessage>
              )}
              {step === 'GET_SIGNATURE' && (
                <AnimatedMessage key="sign">
                  Waiting for signature
                </AnimatedMessage>
              )}
              {step === 'GET_TOKEN' && (
                <AnimatedMessage key="login">Validating wallet</AnimatedMessage>
              )}
            </AnimatePresence>
          </Box>
        </Box>
      )}
      {step === 'FINISHED' && (
        <>
          <DialogContent>
            <DialogContentText
              sx={{ whiteSpace: 'pre-wrap', textAlign: 'center' }}
            >
              Success
              <br />
              now you're entering{' '}
              <NextLink
                passHref
                href={!session?.user?.init ? '/new-user' : '/home'}
              >
                <Link color="primary">the Gateway</Link>
              </NextLink>
              <br />
            </DialogContentText>
          </DialogContent>
        </>
      )}
      {error && (
        <>
          <DialogContent>
            <DialogContentText>{error.message}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={error.onClick ?? onBack}
              fullWidth
              size="small"
            >
              {error.label}
            </Button>
          </DialogActions>
        </>
      )}
    </Box>
  );
}
