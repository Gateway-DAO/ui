import useTranslation from 'next-translate/useTranslation';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import { useAuth } from '@/providers/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { Stack, TextField, Typography } from '@mui/material';

import { TitleSubtitleField } from '../components/title-field';
import { EmailSchema, schemaEmail } from '../schema';
import { useSignUpContext } from '../signup-context';

export function ChooseEmail() {
  const { t } = useTranslation('authentication');
  const { hasuraUserService } = useAuth();
  const { onNewUserSubmitEmail } = useSignUpContext();

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
      await addEmail.mutateAsync({ email: data.email_address });
      onNewUserSubmitEmail(data.email_address);
    } catch (e) {
      setError('email_address', {
        type: 'manual',
        message: e.message,
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
        Connect your email to be notified when you receive a credential
      </Typography>
      <TitleSubtitleField
        title={t('form.authentications.title-send-email')}
        subtitle={
          'By email you are notified when you receive a credential and everything related to your account'
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
          (errors.email_address?.message ??
            t('form.fields.e-mail-helper-text')) as string
        }
      />

      <LoadingButton
        type="submit"
        variant="contained"
        sx={{ mt: 2, height: 48 }}
        isLoading={addEmail.isLoading}
      >
        {t('form.authentications.btn')}
      </LoadingButton>
    </Stack>
  );
}
