import useTranslation from 'next-translate/useTranslation';

import { useConnectedWallet } from '@/hooks/wallet/use-connected-wallet';
import { AuthStep, AuthStepError } from '@/providers/auth/types';
import { AnimatePresence } from 'framer-motion';

import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { AnimatedMessage } from './animated-message';

type Props = {
  step: AuthStep;
  error?: AuthStepError;
  isOpen?: boolean;
  onRetry?: () => void;
  onCancel?: () => void;
};

export function AuthConnectingModal({
  isOpen,
  step,
  error,
  onRetry,
  onCancel,
}: Props) {
  const wallet = useConnectedWallet();
  const { t } = useTranslation('auth');

  return (
    <Dialog
      open={isOpen}
      maxWidth="xs"
      onBackdropClick={step === 'error' ? onCancel : undefined}
    >
      <Box>
        <DialogTitle sx={{ textAlign: 'center' }}>
          {t('connecting.title', {
            connector: wallet?.adapter?.name,
          })}
        </DialogTitle>
        <Box
          sx={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {step !== 'error' && (
            <CircularProgress color="success" sx={{ height: 60, width: 60 }} />
          )}
          {!!error && <Close color="error" sx={{ height: 60, width: 60 }} />}
        </Box>
        {step === 'error' && error ? (
          <>
            <DialogContent>
              <DialogContentText>{error.message}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={onCancel}
                fullWidth
                size="small"
              >
                {t('common:actions.cancel')}
              </Button>
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
        ) : (
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
                {step === 'get-nonce' && (
                  <AnimatedMessage key="nonce">
                    {t('connecting.step.get-nonce')}
                  </AnimatedMessage>
                )}
                {step === 'send-signature' && (
                  <AnimatedMessage key="sign">
                    {t('connecting.step.send-signature')}
                  </AnimatedMessage>
                )}
                {step === 'get-me' && (
                  <AnimatedMessage key="login">
                    {t('connecting.step.get-me')}
                  </AnimatedMessage>
                )}
              </AnimatePresence>
            </Box>
          </Box>
        )}
      </Box>
    </Dialog>
  );
}
