import { useFormContext } from 'react-hook-form';

import { Stack, TextField, Typography } from '@mui/material';

import { CreateCredentialData } from '../schema';

export default function GeneralInfoForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateCredentialData>();

  return (
    <Stack sx={{ mb: 3 }} gap={2}>
      <TextField
        autoFocus
        InputProps={{
          disableUnderline: true,
          sx: {
            '&.Mui-focused': {
              borderBottom: '2px solid #9A53FF',
            },
          },
        }}
        label="Title"
        id="title"
        {...register(`title`)}
        error={!!errors.title}
        helperText={errors.title?.message}
      />
      <TextField
        multiline
        rows={2}
        InputProps={{
          disableUnderline: true,
          sx: {
            '&.Mui-focused': {
              borderBottom: '2px solid #9A53FF',
            },
          },
        }}
        label="Description"
        id="description"
        {...register(`description`)}
        error={!!errors.description}
        helperText={errors.description?.message}
      />
    </Stack>
  );
}
