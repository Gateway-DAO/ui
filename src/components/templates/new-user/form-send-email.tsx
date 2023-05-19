import useTranslation from 'next-translate/useTranslation';

import { useFormContext } from 'react-hook-form';

import { Box, Stack, TextField, Typography } from '@mui/material';

import { LoadingButton } from '@/components/atoms/loading-button';
import { NewUserSchema } from './schema';

type Props = {
  onSubmitSendEmail: (data: NewUserSchema) => void;
  isLoading: boolean;
};

/*
  TODO: Disable submit button on form error
  */

export function FormSendEmail({ onSubmitSendEmail, isLoading }: Props) {
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
      onSubmit={handleSubmit(onSubmitSendEmail)}
    >
      <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
        {t('title-send-email')}
      </Typography>
      <Box>
        <Typography component="h2" variant="h6" fontSize={16}>
          {t('form.title-send-email')}
        </Typography>
        <Typography component="p" variant="caption">
          {t('form.caption-send-email')}
        </Typography>
      </Box>
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
        sx={{ mt: 2, height: 48 }}
        isLoading={isLoading}
      >
        {t('form.send-email-action')}
      </LoadingButton>
    </Stack>
  );
}
