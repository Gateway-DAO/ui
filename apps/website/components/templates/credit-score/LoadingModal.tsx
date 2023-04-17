import { Dispatch, SetStateAction } from 'react';

import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Loading from '../../atoms/loading';

type Props = {
  openLoadingModal: boolean;
};

export default function LoadingModal({ openLoadingModal }: Props) {
  return (
    <div>
      <Dialog
        open={openLoadingModal}
        onClose={() => {}}
        sx={{ '& .MuiDialog-paper': { width: 400, height: 200 } }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Stack flexDirection={'column'} alignItems={'start'}>
          <DialogTitle id="alert-dialog-title">
            <Loading />
          </DialogTitle>
          <DialogContent>
            {'Your credential is being issued'}
            <DialogContentText
              id="alert-dialog-description"
              sx={{ marginTop: '30px' }}
            >
              It only takes a few seconds.
            </DialogContentText>
          </DialogContent>
        </Stack>
      </Dialog>
    </div>
  );
}
