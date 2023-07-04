import useTranslation from 'next-translate/useTranslation';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import { hasuraPublicService } from '@/services/hasura/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { Stack, TextField } from '@mui/material';

import { EmailSchema, schemaEmail } from '../schema';
import { useSignUpContext } from '../signup-context';

export function LoginEmail() {
  const { t } = useTranslation('authentication');
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    resolver: yupResolver(schemaEmail),
  });
  const { onSubmitEmail } = useSignUpContext();

  const createEmailNonce = useMutation(hasuraPublicService.create_email_nonce);

  const onSubmit = async (data: EmailSchema) => {
    try {
      await createEmailNonce.mutateAsync({ email: data.email_address });
      onSubmitEmail(data.email_address);
    } catch (e) {
      setError('email_address', {
        type: 'manual',
        message: e.message,
      });
    }
  };

  return (
    <Stack component="form" gap={2} onSubmit={handleSubmit(onSubmit)}>
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
        isLoading={createEmailNonce.isLoading}
      >
        {t('steps.initial.btn')}
      </LoadingButton>
    </Stack>
  );
}
