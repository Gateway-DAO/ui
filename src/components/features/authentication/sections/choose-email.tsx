import useTranslation from 'next-translate/useTranslation';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import { errorMessages } from '@/constants/error-messages';
import { useAuth } from '@/providers/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import { Stack, TextField, Typography } from '@mui/material';

import { TitleSubtitleField } from '../components/title-field';
import { EmailSchema, schemaEmail } from '../schema';
import { useSignUpContext } from '../signup-context';

export function ChooseEmail() {
  const { t } = useTranslation('authentication');
  const { hasuraUserService } = useAuth();
  const { onNewUserSubmitEmail } = useSignUpContext();
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<EmailSchema>({
    resolver: yupResolver(schemaEmail),
  });

  const addEmail = useMutation(hasuraUserService.protocol_add_email);

  const onSubmitEmail = async (data: EmailSchema) => {
    try {
      await addEmail.mutateAsync({ email: data.email_address.toLowerCase() });
      onNewUserSubmitEmail(data.email_address.toLowerCase());
    } catch (e) {
      (e as any)?.response?.errors?.forEach(({ message }) => {
        if (message === 'EMAIL_ALREADY_REGISTERED') {
          setError('email_address', {
            type: 'manual',
            message: errorMessages[message],
          });
        } else {
          enqueueSnackbar(
            errorMessages[message] || errorMessages.UNEXPECTED_ERROR,
            {
              variant: 'error',
            }
          );
        }
      });
    }
  };

  return (
    <Stack
      component="form"
      gap={2}
      direction={'column'}
      onSubmit={handleSubmit(onSubmitEmail)}
    >
      <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
        {t('steps.choose-email.title')}
      </Typography>
      <TitleSubtitleField
        title={t('steps.choose-email.subtitle')}
        subtitle={t('steps.choose-email.description')}
      />
      <TextField
        required
        label={t('steps.choose-email.label')}
        type="email"
        id="email_address"
        {...register('email_address')}
        error={!!errors.email_address}
        helperText={
          (errors.email_address?.message ??
            t('steps.choose-email.helper-text')) as string
        }
      />

      <LoadingButton
        type="submit"
        variant="contained"
        sx={{ mt: 2, height: 48 }}
        isLoading={addEmail.isLoading}
      >
        {t('steps.initial.btn')}
      </LoadingButton>
    </Stack>
  );
}
