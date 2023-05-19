import useTranslation from 'next-translate/useTranslation';
import { Dispatch, SetStateAction } from 'react';

import Loading from '@/components/atoms/loading';

import { CircularProgress, Stack, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
  openLoadingModal: boolean;
};

export default function LoadingModal({ openLoadingModal }: Props) {
  const { t } = useTranslation('credit-score');

  return (
    <div>
      <Dialog
        open={openLoadingModal}
        onClose={() => {}}
        sx={{
          '& .MuiDialog-paper': { width: 400, display: 'flex' },
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <CircularProgress />
          <Typography variant="h6" mt={3}>
            {t('modal.title')}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('modal.description')}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
