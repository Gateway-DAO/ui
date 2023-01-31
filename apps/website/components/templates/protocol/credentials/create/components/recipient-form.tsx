import useTranslation from 'next-translate/useTranslation';

import { useFormContext } from 'react-hook-form';

import { brandColors } from '@gateway/theme';

import { alpha, Stack, TextField, Typography } from '@mui/material';

import { CreateCredentialInput } from '../../../../../../services/gateway-protocol/types';

export default function RecipientForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateCredentialInput>();
  const { t } = useTranslation('protocol');

  return (
    <Stack>
      <Typography fontWeight={600}>
        {t('data-model.issue-credential.group-recipient-title')}
      </Typography>
      <Typography
        fontSize={14}
        sx={{ color: alpha(brandColors.white.main, 0.7), mb: 3 }}
      >
        {t('data-model.issue-credential.group-recipient-description')}
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
          label={t('data-model.issue-credential.recipient-label')}
          id="recipient-id"
          {...register(`recipientId`)}
          error={!!errors.recipientId}
          helperText={errors.recipientId?.message}
        />
      </Stack>
    </Stack>
  );
}