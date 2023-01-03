import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Stack, IconButton, Typography, Box } from '@mui/material';

type Props = {
  open: boolean;
  handleClose: () => void;
  image: string;
  title: string;
};

export default function ModalImage({ open, handleClose, image, title }: Props) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack
        direction="column"
        sx={{
          bgcolor: 'background.paper',
          px: { xs: 2, md: 6, lg: 12 },
          py: { xs: 1, md: 5 },
          height: '100%',
          width: { md: '100%' },
          display: 'flex',
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1" fontSize={14}>
            {title}
          </Typography>
          <IconButton
            sx={{
              position: 'absolute',
              top: '30px',
              right: '30px',
            }}
            onClick={() => handleClose()}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
        <Box
          sx={{ p: 4, textAlign: 'center', maxWidth: '400px', margin: 'auto' }}
        >
          <img src={image} alt={title} width="100%" />
        </Box>
      </Stack>
    </Dialog>
  );
}
