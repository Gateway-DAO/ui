import useTranslation from 'next-translate/useTranslation';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
} from '@mui/material';

import { ManualTaskEventType } from '../../../../../../../../types/tasks';

type Props = {
  selectedEvent?: Extract<ManualTaskEventType, 'approve' | 'reject'>;
  onSubmit: () => void;
  onCancel: () => void;
};

export function SubmissionConfirmModal({
  selectedEvent,
  onSubmit,
  onCancel,
}: Props) {
  const { t } = useTranslation('common');
  return (
    <Dialog
      open={!!selectedEvent}
      onClose={() => {}}
      aria-labelledby="submission-confirm-title"
      aria-describedby="submission-confirm-description"
    >
      <DialogTitle id="submission-confirm-title">
        Are you sure you want to{' '}
        {selectedEvent === 'approve' ? 'approve' : 'reject'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="submission-confirm-description">
          This action cannot be undone
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onCancel}>
          {t('actions.cancel')}
        </Button>
        <Button variant="contained" onClick={onSubmit}>
          {t('actions.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
