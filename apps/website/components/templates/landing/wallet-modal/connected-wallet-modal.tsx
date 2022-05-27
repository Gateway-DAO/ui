/* eslint-disable react/no-unescaped-entities */
import { signIn, useSession } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

import { AnimatePresence } from 'framer-motion';
import { useMutation, useQuery } from 'react-query';
import { useConnect, useAccount, useSignMessage } from 'wagmi';

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

import { gqlMethodsClient } from '../../../../services/api';
import { AnimatedMessage } from './animated-message';
import { useConnectWallet } from './state';

type Props = {
  onBack: () => void;
};

/* TODO: Improve state handling with state machine */
/* TODO: Move this out from here, move to page level */

export function ConnectedWallet({ onBack }: Props) {
  const { activeConnector } = useConnect();
  const { data: session } = useSession();
  const router = useRouter();

  const { state, error, isLoading } = useConnectWallet();

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
        {state === 'FINISHED' && (
          <Check color="success" sx={{ height: 60, width: 60 }} />
        )}
        {state !== 'FINISHED' && !error && (
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
              {state === 'GET_ACCOUNT' && (
                <AnimatedMessage key="account">Loading account</AnimatedMessage>
              )}
              {state === 'GET_NONCE' && (
                <AnimatedMessage key="nonce">
                  Checking if you is you
                </AnimatedMessage>
              )}
              {state === 'GET_SIGNATURE' && (
                <AnimatedMessage key="sign">
                  Waiting for signature
                </AnimatedMessage>
              )}
              {state === 'GET_TOKEN' && (
                <AnimatedMessage key="login">Validating wallet</AnimatedMessage>
              )}
            </AnimatePresence>
          </Box>
        </Box>
      )}
      {state === 'FINISHED' && (
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
                href={session?.user?.isFirstTime ? '/new-user' : '/home'}
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
