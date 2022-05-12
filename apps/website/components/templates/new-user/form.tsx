import Link from 'next/link';

import { Controller, useFormContext } from 'react-hook-form';

import { Button, Input, Stack, TextField } from '@mui/material';

import { NewUserForm } from './schema';

export function Form() {
  const { control } = useFormContext<NewUserForm>();
  return (
    <Stack component="form" direction="column" gap={1}>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField required label="Display Name" id={field.name} {...field} />
        )}
      />
      <Controller
        name="username"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField required label="Username" id={field.name} {...field} />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            required
            label="E-mail"
            type="email"
            id={field.name}
            {...field}
          />
        )}
      />
      <Link passHref href="/home">
        <Button variant="contained">Enter the Gateway</Button>
      </Link>
    </Stack>
  );
}
