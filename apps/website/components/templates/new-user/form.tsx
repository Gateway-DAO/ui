import { useFormContext } from 'react-hook-form';

import { Stack, TextField } from '@mui/material';

import { LoadingButton } from '../../atoms/loading-button';
import { NewUserSchema } from './schema';

type Props = {
  onSubmit: (data: NewUserSchema) => void;
  isLoading: boolean;
};

/*
  TODO: Change hardcoded text to translate
  TODO: Loading submit button
  TODO: Disable submit button on form error
  */

export function Form({ onSubmit, isLoading }: Props) {
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
        label="Display Name"
        id="name"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        required
        label="Gateway ID"
        id="username"
        {...register('username')}
        error={!!errors.username}
        helperText={
          errors.username?.message ??
          'Valid: lowercase alphanumeric charaters and ._-'
        }
      />
      <TextField
        required
        label="E-mail"
        type="email"
        id="email_address"
        {...register('email_address')}
        error={!!errors.email_address}
        helperText={errors.email_address?.message}
      />
      <LoadingButton
        variant="contained"
        type="submit"
        sx={{ mt: 2 }}
        isLoading={isLoading}
      >
        Enter the Gateway
      </LoadingButton>
    </Stack>
  );
}
