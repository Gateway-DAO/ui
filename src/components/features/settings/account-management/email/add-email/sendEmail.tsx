import useTranslation from 'next-translate/useTranslation';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import { TitleSubtitleField } from '@/components/atoms/title-field';
import { useFormContext } from 'react-hook-form';

import { Stack, TextField } from '@mui/material';

import { EmailSchema } from './schema';

type Props = {
  onSubmitSendEmail: (data: EmailSchema) => void;
  isLoading: boolean;
  disabledField: boolean;
};

export default function SendEmail({
  onSubmitSendEmail,
  isLoading,
  disabledField,
}: Props) {
  const { t } = useTranslation('settings');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<EmailSchema>();

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmitSendEmail)} gap={3}>
      <TitleSubtitleField
        title={t('account-management.add-email.subtitle')}
        subtitle={t('account-management.add-email.description')}
      />
      <TextField
        sx={{ mb: 3 }}
        variant="outlined"
        type="email"
        name="email"
        disabled={disabledField}
        error={!!errors?.email_address}
        helperText={errors.email_address?.message}
        {...register('email_address', { required: true })}
        placeholder={t('account-management.email-address-label')}
      />
      <LoadingButton
        variant="contained"
        type="submit"
        isLoading={isLoading}
        sx={{
          height: 48,
          width: 205,
        }}
      >
        {t('common:actions.continue')}
      </LoadingButton>
    </Stack>
  );
}
