import Image from 'next/image';

import { AiOutlineClose, AiOutlineCopy } from 'react-icons/ai';

import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  height: '100vh',
  minWidth: '100%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PocModalCreated({ open, handleClose }) {
  return (
    <div>
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
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            fontSize={48}
            textAlign="center"
          >
            Proof of Credential created
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, textAlign: 'center' }}
            fontSize={16}
          >
            You have created the{' '}
            <span style={{ color: '#D083FF' }}>
              Olympus Operations Working Group - Season 2
            </span>{' '}
            credential.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <fieldset
              style={{
                display: 'flex',
                border: '1px solid white',
                borderRadius: '20px',
              }}
            >
              <legend>Share</legend>
              http://gtwy.xyz/olpmt
              <AiOutlineCopy
                size={24}
                style={{ marginLeft: '10px', cursor: 'pointer' }}
              />
            </fieldset>
            <Button
              variant="outlined"
              size="small"
              sx={{ margin: '20px 0 0 20px' }}
            >
              Go to credentials
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
