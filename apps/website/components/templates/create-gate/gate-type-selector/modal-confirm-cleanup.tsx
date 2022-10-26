import useTranslation from 'next-translate/useTranslation';

import { useFormContext } from 'react-hook-form';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { CreateGateTypes } from '../schema';

type Props = {
  onClose: () => void;
};

export function ModalConfirmCleanup({ onClose }: Props) {
  const { t } = useTranslation('gate-new');
  const methods = useFormContext<CreateGateTypes>();

  const onConfirm = () => {
    methods.setValue('type', undefined);
    methods.setValue('tasks', undefined);
  };

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
