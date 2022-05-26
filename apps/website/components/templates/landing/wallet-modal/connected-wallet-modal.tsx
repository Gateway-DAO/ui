/* eslint-disable react/no-unescaped-entities */
import { signIn, useSession } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

import { AnimatePresence } from 'framer-motion';
import { useQuery } from 'react-query';
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

type Props = {
  onBack: () => void;
};

/* TODO: Improve state handling with state machine */
/* TODO: Move this out from here, move to page level */
export function ConnectedWallet({ onBack }: Props) {
  const { activeConnector } = useConnect();
  const { data: session } = useSession();
  const router = useRouter();
  const account = useAccount();
  const sign = useSignMessage();

  const sendSignature = useCallback(
    (nonce: number) =>
      sign.signMessage({
        message: `Welcome to Gateway!\n\nPlease sign this message for access: ${nonce}`,
      }),
    [sign]
  );

  /* Handles nonce generation */
  const nonce = useQuery(
    [account.data?.address, 'nonce'],
    () => gqlMethodsClient.get_nonce({ wallet: account.data.address! }),
    {
      enabled: account.isSuccess && !!account.data?.address,
      onSuccess({ get_nonce: { nonce } }) {
        sendSignature(nonce);
      },
    }
  );

  const login = useQuery(
    [account.data?.address, sign.data, 'login'],
    () =>
      signIn('credentials', {
        redirect: false,
        wallet: account.data.address!,
        signature: sign.data,
      }),
    {
      enabled: sign.isSuccess && !!account.data?.address,
      async onSuccess() {
        const session = await getSession();
        router.push(session.user.isFirstTime ? "'/new-user'" : '/home');
      },
    }
  );

  const isLoading =
    account.isLoading || nonce.isLoading || sign.isLoading || login.isLoading;

  const error = useMemo(() => {
    if (account.isError)
      return {
        label: 'Reconnect to Wallet',
        message: account.error,
        onClick: onBack,
      };
    if (nonce.isError)
      return {
        label: 'Try again',
        message: (nonce.error as any)?.response?.errors?.[0]?.message,
        onClick: () => nonce.refetch(),
      };
    if (sign.isError || (sign.isIdle && nonce.isSuccess))
      return {
        label: 'Try sign again',
        message: sign.error,
        onClick: () => sendSignature(nonce.data?.get_nonce?.nonce),
      };
    if (login.isError)
      return {
        label: 'Try again',
        message: (login.error as any)?.response?.errors?.[0]?.message,
        onClick: () => {
          sign.reset();
          nonce.remove();
          login.remove();
          onBack();
        },
      };
    return undefined;
  }, [
    account.error,
    account.isError,
    login.error,
    login.isError,
    login.refetch,
    nonce.data?.get_nonce?.nonce,
    nonce.error,
    nonce.isIdle,
    nonce.isError,
    nonce.refetch,
    onBack,
    sendSignature,
    sign.error,
    sign.isError,
  ]);

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
        {login.isSuccess && (
          <Check color="success" sx={{ height: 60, width: 60 }} />
        )}
        {!login.isSuccess && !error && (
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
              {account.isLoading && (
                <AnimatedMessage key="account">Loading account</AnimatedMessage>
              )}
              {nonce.isLoading && (
                <AnimatedMessage key="nonce">
                  Checking if you is you
                </AnimatedMessage>
              )}
              {sign.isLoading && (
                <AnimatedMessage key="sign">
                  Waiting for signature
                </AnimatedMessage>
              )}
              {login.isLoading && (
                <AnimatedMessage key="login">Validating wallet</AnimatedMessage>
              )}
            </AnimatePresence>
          </Box>
        </Box>
      )}
      {login.isSuccess && (
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
              onClick={error.onClick}
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
