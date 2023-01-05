import useTranslation from 'next-translate/useTranslation';

import { Dialog, Stack, Button, Box, Paper } from '@mui/material';

type Props = {
  open: boolean;
  handleClose: () => void;
  image: string;
  alt: string;
  downloadButtonText?: string;
};

export default function ModalImage({
  open,
  handleClose,
  image,
  alt,
  downloadButtonText,
}: Props) {
  const { t } = useTranslation('protocol');
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper
        direction="column"
        elevation={5}
        component={Stack}
        sx={{
          px: { xs: 2, lg: 3 },
          py: { xs: 2, lg: 3 },
          height: '100%',
          width: { md: '100%' },
          display: 'flex',
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            maxWidth: '396px',
            margin: 'auto',
            mb: 3,
            borderRadius: 1,
            overflow: 'hidden',
            display: 'flex',
          }}
        >
          <img src={image} alt={alt} width="100%" />
        </Box>
        <Stack gap={1}>
          {downloadButtonText && (
            <Button variant="contained" href={image} target="_blank" download>
              {downloadButtonText}
            </Button>
          )}
          <Button
            component="a"
            variant="outlined"
            onClick={() => handleClose()}
          >
            {t('common:actions.close')}
          </Button>
        </Stack>
      </Paper>
    </Dialog>
  );
}
