import { AiOutlineClose } from 'react-icons/ai';

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
          <AiOutlineClose
            size={28}
            style={{
              position: 'absolute',
              right: '50px',
              top: '20px',
              cursor: 'pointer',
            }}
            onClick={handleClose}
          />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Proof of Credential created
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You have created the Olympus Operations Working Group - Season 2
            credential.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
