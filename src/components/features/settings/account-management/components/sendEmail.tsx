import useTranslation from 'next-translate/useTranslation';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import { useFormContext } from 'react-hook-form';

import { Stack, TextField } from '@mui/material';

import { SendEmailSchema } from '../schema';

type Props = {
  onSubmitSendEmail: (data: SendEmailSchema) => void;
  isLoading: boolean;
  showButton: boolean;
  disabledField: boolean;
};

export default function SendEmail({
  onSubmitSendEmail,
  isLoading,
  showButton,
  disabledField,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<SendEmailSchema>();

  const { t } = useTranslation('settings');

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmitSendEmail)}>
      <Stack sx={{ width: '100%', mb: 3 }}>
        <TextField
          sx={{ mb: 4 }}
          variant="outlined"
          type="email"
          name="email"
          disabled={disabledField}
          error={!!errors?.email}
          helperText={
            errors.email?.message ??
            t('account-management.email-address-helper')
          }
          {...register('email', { required: true })}
          placeholder={t('account-management.email-address-label')}
        />
        {showButton && (
          <LoadingButton
            variant="contained"
            type="submit"
            isLoading={isLoading}
            sx={{
              height: 48,
              width: 205,
            }}
          >
            {t('account-management.email-address-action')}
          </LoadingButton>
        )}
      </Stack>
    </Stack>
  );
}
