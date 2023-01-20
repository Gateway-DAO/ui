import { useFormContext } from 'react-hook-form';

import { Stack, TextField } from '@mui/material';

import { CreateCredentialInput } from '../../../../../../services/gateway-protocol/types';

export default function GeneralInfoForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateCredentialInput>();

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
