import useTranslation from 'next-translate/useTranslation';

import { useFormContext } from 'react-hook-form';

import { Stack, TextField } from '@mui/material';

import { LoadingButton } from '../../atoms/loading-button';
import { NewUserSchema } from './schema';

type Props = {
  onSubmit: (data: NewUserSchema) => void;
  isLoading: boolean;
};

/*
  TODO: Disable submit button on form error
  */

export function Form({ onSubmit, isLoading }: Props) {
  const { t } = useTranslation('dashboard-new-user');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<NewUserSchema>();

  return (
    <Stack
      component="form"
      direction="column"
      gap={2}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        required
        label={t('form.fields.gateway-id')}
        id="username"
        {...register('username')}
        error={!!errors.username}
        helperText={
          errors.username?.message ?? t('form.fields.gateway-id-helper-text')
        }
      />
      <TextField
        required
        label={t('form.fields.e-mail')}
        type="email"
        id="email_address"
        {...register('email_address')}
        error={!!errors.email_address}
        helperText={
          errors.email_address?.message ?? t('form.fields.e-mail-helper-text')
        }
      />
      <LoadingButton
        variant="contained"
        type="submit"
        sx={{ mt: 2 }}
        isLoading={isLoading}
      >
        {t('form.form-action')}
      </LoadingButton>
    </Stack>
  );
}
