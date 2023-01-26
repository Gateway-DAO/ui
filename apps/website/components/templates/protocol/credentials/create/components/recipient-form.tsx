import { useFormContext } from 'react-hook-form';

import { brandColors } from '@gateway/theme';

import { alpha, Stack, TextField, Typography } from '@mui/material';

import { CreateCredentialInput } from '../../../../../../services/gateway-protocol/types';

export default function RecipientForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateCredentialInput>();

  return (
    <Stack>
      <Typography fontWeight={600}>Send to</Typography>
      <Typography
        fontSize={14}
        sx={{ color: alpha(brandColors.white.main, 0.7), mb: 3 }}
      >
        Send this credential directly to someone
      </Typography>
      <Stack sx={{ mb: 3 }} gap={3}>
        <TextField
          InputProps={{
            disableUnderline: true,
            sx: {
              '&.Mui-focused': {
                borderBottom: '2px solid #9A53FF',
              },
            },
          }}
          label="Gateway ID or wallet address"
          id="recipient-id"
          {...register(`recipientId`)}
          error={!!errors.recipientId}
          helperText={errors.recipientId?.message}
        />
      </Stack>
    </Stack>
  );
}
