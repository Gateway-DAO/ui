import { Check, Close } from '@mui/icons-material';
import { Box, Button, CircularProgress, DialogContent } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { AnimatedMessage } from '../../../atoms/animated-message';

export function Minting({ screen, setScreen, setOpen, mint }) {
  return (
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
        {screen !== 'successful' && screen !== 'failed' && (
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

        {screen == 'successful' && (
          <Check
            sx={{
              height: 40,
              width: 40,
              m: 2,
              p: 1,
              color: 'primary.dark',
              bgcolor: 'success.light',
              borderRadius: '50%',
            }}
          />
        )}

        {screen == 'failed' && (
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
          <AnimatePresence>
            {screen === 'signin' && (
              <AnimatedMessage key="signin">
                Please sign the transaction
              </AnimatedMessage>
            )}
            {screen === 'minting' && (
              <AnimatedMessage key="account">
                Minting credential
              </AnimatedMessage>
            )}
            {screen === 'successful' && (
              <AnimatedMessage key="successful">
                Credential successfully minted as NFT
              </AnimatedMessage>
            )}
            {screen === 'failed' && (
              <AnimatedMessage key="failed">
                Something went wrong on minting
              </AnimatedMessage>
            )}
          </AnimatePresence>
        </Box>
      </Box>
      {screen === 'failed' && (
        <>
          <Box sx={{ mb: 2 }}>
            <Button
              size="large"
              variant="contained"
              fullWidth
              onClick={() => setScreen('mint')}
            >
              RETRY MINT AS NFT
            </Button>
          </Box>
          <Box>
            <Button
              size="large"
              variant="outlined"
              fullWidth
              onClick={() => setOpen(false)}
            >
              cancel
            </Button>
          </Box>
        </>
      )}
    </DialogContent>
  );
}
