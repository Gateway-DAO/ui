import useTranslation from 'next-translate/useTranslation';

import { brandColors } from '@gateway/theme';

import { Check, Close, IosShare } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';

import { AnimatedMessage } from '../../../../../atoms/animated-message';

export type DialogStatuses = 'loading' | 'error' | 'success' | 'idle' | 'share';

type MintDialogProps = {
  isOpen: boolean;
  status: DialogStatuses;
  onClose: any;
};

export function MintDialog({ isOpen, status, onClose }: MintDialogProps) {
  const { t } = useTranslation('protocol');

  return (
    <Dialog open={isOpen} fullWidth maxWidth="xs" onClose={onClose}>
      <DialogTitle sx={{ pb: 0.5 }}>Mint as NFT</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            height: 247,
            backgroundColor: 'primary',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {status === 'loading' && (
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

          {status === 'share' && (
            <IosShare
              color="secondary"
              sx={{
                height: 40,
                width: 40,
                m: 2,
                p: 1,
                bgcolor: 'primary.light',
                borderRadius: '50%',
              }}
            />
          )}

          {status == 'success' && (
            <Check
              sx={(theme) => ({
                height: 40,
                width: 40,
                m: 2,
                p: 1,
                color: theme.palette.background.light,
                bgcolor: 'success.light',
                borderRadius: '50%',
              })}
            />
          )}
          {status == 'error' && (
            <Close
              sx={{
                height: 40,
                width: 40,
                m: 2,
                p: 1,
                color: 'primary',
                bgcolor: 'error.main',
                borderRadius: '50%',
              }}
            />
          )}

          <Box sx={{ width: 200, position: 'relative' }}>
            {status === 'loading' && (
              <AnimatedMessage key="account">
                {t('credential.mint-card.feedback-minting')}
              </AnimatedMessage>
            )}
            {status === 'success' && (
              <AnimatedMessage key="successful">
                {t('credential.mint-card.feedback-successful')}
              </AnimatedMessage>
            )}
            {status === 'share' && (
              <AnimatedMessage key="share">
                {t('credential.mint-card.feedback-share')}
              </AnimatedMessage>
            )}
            {status === 'error' && (
              <AnimatedMessage key="failed">
                {t('credential.mint-card.feedback-failed')}
              </AnimatedMessage>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
