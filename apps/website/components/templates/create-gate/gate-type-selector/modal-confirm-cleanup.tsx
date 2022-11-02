import useTranslation from 'next-translate/useTranslation';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

type Props = {
  onClose: () => void;
  onConfirm: () => void;
};

export function ModalConfirmCleanup({ onClose, onConfirm }: Props) {
  const { t } = useTranslation('gate-new');

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{t('gate_type_change_modal.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('gate_type_change_modal.description')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          {t('common:actions.cancel')}
        </Button>
        <Button variant="contained" onClick={onConfirm}>
          {t('common:actions.change')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
