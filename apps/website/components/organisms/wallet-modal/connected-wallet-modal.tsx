/* eslint-disable react/no-unescaped-entities */
import { useEffect } from 'react';

import { AnimatePresence } from 'framer-motion';
import { useConnect, useDisconnect } from 'wagmi';

import { Check, Close } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { AnimatedMessage } from './animated-message';
import { useConnectWallet } from './state';

type Props = {
  isError: boolean;
  onError: () => void;
  onBack: () => void;
  onSuccess: () => void;
};

/* TODO: Move this out from here, move to page level */

export function ConnectedWallet({
  isError,
  onError,
  onBack,
  onSuccess,
}: Props) {
  const { data } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { step, error, isLoading } = useConnectWallet();

  const onRetry = async () => {
    await disconnectAsync();
    onBack();
  };

  useEffect(() => {
    if (step === 'FINISHED') {
      onSuccess();
    }
  }, [onSuccess, step]);

  useEffect(() => {
    if (error && !isError) {
      onError();
    }
  }, [error, isError, onError]);

  if (!data?.connector?.name) return null;

  return (
    <Box>
      <DialogTitle sx={{ textAlign: 'center' }}>
        Connecting using {data?.connector?.name}
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
            </DialogContentText>
            <Button onClick={onSuccess}>Close</Button>
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
              onClick={onRetry}
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
