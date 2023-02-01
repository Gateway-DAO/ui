import { useFormContext } from 'react-hook-form';

import { TextField } from '@mui/material';

import { ClaimFieldProps } from './ClaimFieldProps';

export default function ClaimFormText({
  type,
  label,
  fieldName,
}: ClaimFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <TextField
      type={type}
      InputProps={{
        disableUnderline: true,
        sx: {
          '&.Mui-focused': {
            borderBottom: '2px solid #9A53FF',
          },
          width: '100%',
        },
      }}
      sx={{ width: '100%' }}
      label={label}
      id={`data-model-field-${fieldName}`}
      {...register(`claim.${fieldName}`, {
        valueAsNumber: type === 'number',
      })}
      error={!!errors?.claim && !!errors?.claim[fieldName]}
      helperText={
        !!errors?.claim && errors?.claim[fieldName]?.message?.toString()
      }
    />
  );
}
