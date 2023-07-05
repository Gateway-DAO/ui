import useTranslation from 'next-translate/useTranslation';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { ConfirmDeleteSchema, schemaConfirmDelete } from './schema';

type Props = {
  textKey: string;
  checkText: string;
  buttonText: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDelete({
  textKey,
  checkText,
  buttonText,
  onConfirm,
  onCancel,
}: Props) {
  const { t } = useTranslation('common');

  const {
    register,
    formState: { errors, isValid },
    setError,
    handleSubmit,
  } = useForm<ConfirmDeleteSchema>({
    mode: 'all',
    resolver: yupResolver(schemaConfirmDelete),
  });

  const onConfirmDelete = async (data) => {
    if (!isValid) return;
    if (data.text === textKey) {
      onConfirm();
    } else {
      setError('text', {
        message: t('modal-confirm-delete.error-message'),
      });
    }
  };

  return (
    <Stack pt={6} component="form" onSubmit={handleSubmit(onConfirmDelete)}>
      <Typography fontWeight={600} sx={{ mb: 3 }}>
        {`${t('modal-confirm-delete.text-confirm1')} “${textKey}” ${t(
          'modal-confirm-delete.text-confirm2'
        )}`}
      </Typography>
      <TextField
        type="text"
        id="confirm-delete"
        {...register('text')}
        error={!!errors.text}
        helperText={errors.text?.message ?? ''}
        sx={{ mb: 3 }}
      />
      <FormControlLabel
        control={<Checkbox />}
        label={checkText}
        {...register(`checked`)}
      />
      {!!errors.checked && (
        <Typography fontSize={12} color="error">
          {errors.checked?.message}
        </Typography>
      )}
      <Stack py={6} direction="row" gap={1} justifyContent="space-between">
        <Button variant="outlined" fullWidth size="large" onClick={onCancel}>
          {t('actions.cancel')}
        </Button>
        <Button
          disabled={!isValid}
          variant="contained"
          color="error"
          fullWidth
          size="large"
          type="submit"
        >
          {buttonText}
        </Button>
      </Stack>
    </Stack>
  );
}
