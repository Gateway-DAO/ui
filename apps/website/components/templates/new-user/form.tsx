import { useFormContext } from 'react-hook-form';

import { Button, Stack, TextField } from '@mui/material';

import { NewUserSchema } from './schema';

type Props = {
  onSubmit: (data: NewUserSchema) => void;
};

/*
  TODO: Change hardcoded text to translate
  TODO: Loading submit button
  TODO: Disable submit button on form error
  */

export function Form({ onSubmit }: Props) {
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
        label="Username"
        id="username"
        {...register('username')}
        error={!!errors.username}
        helperText={errors.username?.message}
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
      <Button variant="contained" type="submit" sx={{ mt: 2 }}>
        Enter the Gateway
      </Button>
    </Stack>
  );
}
