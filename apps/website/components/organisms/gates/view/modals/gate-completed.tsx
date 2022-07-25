import Image from 'next/image';
import { useRouter } from 'next/router';

import CloseIcon from '@mui/icons-material/Close';
import { Button, SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import { GatesCard } from '../../../../molecules/gates-card';

const style: SxProps = {
  bgcolor: 'background.paper',
  p: 3,
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
};

export default function GateCompletedModal({ gate, open, handleClose }) {
  const router = useRouter();

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          overflowY: 'auto',
        }}
      >
        <Box sx={style}>
          <Box>
            <Image
              src="/favicon-512.png"
              alt="gateway-logo"
              height={40}
              width={40}
            />
            <IconButton
              aria-label="close"
              onClick={() => {
                handleClose();
                router.push('/profile');
              }}
              sx={{
                position: 'absolute',
                right: 20,
                top: 25,
                color: '#fff',
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '64px',
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <Box>
              <Typography
                id="modal-modal-title"
                variant="h3"
                component="h3"
                fontSize={48}
                textAlign="center"
                sx={{
                  mb: 3,
                }}
              >
                Congratulations!
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mb: 6, textAlign: 'center' }}
                fontSize={16}
              >
                You have completed the{' '}
                <span style={{ color: '#D083FF' }}>{gate.title}</span> Gate from{' '}
                <span style={{ color: '#D083FF' }}>{gate.dao.name}</span>.
              </Typography>
            </Box>
            <GatesCard {...gate} />
            <Button
              variant="outlined"
              size="medium"
              sx={{ margin: '20px 0 0 20px' }}
              onClick={() => router.push('/profile')}
            >
              View on Profile
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
