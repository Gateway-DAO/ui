import Image from 'next/image';
import { useRouter } from 'next/router';

import { AiOutlineClose } from 'react-icons/ai';

import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import CredentialCard from '../../molecules/credential-card';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  minWidth: '100%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 4,
};

export default function PocModalMinted({ open, handleClose }) {
  const router = useRouter();

  return (
    <div>
      {/* TODO: Add dialog before making the modal appear */}
      {/* TODO: Modal doesn't scroll when window is not full screen */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Image
            src="/favicon-512.png"
            alt="gateway-logo"
            height={40}
            width={40}
          />
          <AiOutlineClose
            size={28}
            style={{
              position: 'absolute',
              right: '50px',
              top: '32px',
              cursor: 'pointer',
            }}
            onClick={handleClose}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              minHeight: '830px',
            }}
          >
            <Box>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                fontSize={48}
                textAlign="center"
              >
                Congrats your work is verified and on-chain.{' '}
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, textAlign: 'center' }}
                fontSize={16}
              >
                Your NFT has been minted at cost free subsidized by{' '}
                <span style={{ color: '#D083FF' }}>Gateway</span> .
              </Typography>
            </Box>
            <CredentialCard />
            <Button
              variant="outlined"
              size="small"
              sx={{ margin: '20px 0 0 20px' }}
              onClick={() => {
                handleClose();
                router.push('/profile');
              }}
            >
              Back to Profile
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
