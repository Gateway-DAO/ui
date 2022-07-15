import { Button, CircularProgress } from '@mui/material';
import { GatewayGrayIcon } from '@gateway/assets';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { AnimatePresence } from 'framer-motion';
import { AnimatedMessage } from '../utlis/animate-message';
import { Check, Close } from '@mui/icons-material';
import { Subjects } from '../index';

export function MintingScreen({
  mintProcessStatus,
  setMintProcessStatus,
  details,
}) {
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
          height: 270,
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
        {mintProcessStatus !== Subjects.successful &&
          mintProcessStatus !== Subjects.failed && (
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

        {mintProcessStatus == Subjects.successful && (
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

        {mintProcessStatus == Subjects.failed && (
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
            {mintProcessStatus === Subjects.sign && (
              <AnimatedMessage key="signin">
                Please sign the transaction
              </AnimatedMessage>
            )}
            {mintProcessStatus === Subjects.minting && (
              <AnimatedMessage key="account">
                Minting credential
              </AnimatedMessage>
            )}
            {mintProcessStatus === Subjects.successful && (
              <AnimatedMessage key="successful">
                Credential successfully minted as NFT
              </AnimatedMessage>
            )}
            {mintProcessStatus === Subjects.failed && (
              <AnimatedMessage key="failed">
                Something went wrong on minting{' '}
                {details.error?.reason && `: ${details.error.reason}`}
              </AnimatedMessage>
            )}
          </AnimatePresence>
        </Box>
      </Box>
      {mintProcessStatus === Subjects.failed && (
        <Box sx={{ m: 2, mb: 1.5 }}>
          <Button
            size="large"
            variant="contained"
            fullWidth
            onClick={() => setMintProcessStatus(Subjects.start)}
          >
            RETRY MINT AS NFT
          </Button>
        </Box>
      )}
    </>
  );
}
