import { signIn } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';

import { errorMessages } from '@/constants/error-messages';
import { mutation } from '@/constants/queries';
import { useCountdown } from '@/hooks/use-countdown';
import { useAuth } from '@/providers/auth';
import { hasuraPublicService } from '@/services/hasura/api';
import { ErrorResponse } from '@/types/graphql';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useToggle } from 'react-use';

import { Stack, TextField, Typography } from '@mui/material';

import { LoadingButton } from '../../../atoms/buttons/loading-button';
import { CardSummary } from '../components/card-summary';
import { TitleSubtitleField } from '../components/title-field';
import { TokenConfirmationSchema, schemaTokenConfirmation } from '../schema';
import { useSignUpContext } from '../signup-context';

export function VerifyEmailAddToken() {
  const { t } = useTranslation('authentication');
  const { enqueueSnackbar } = useSnackbar();
  const { hasuraUserService, onInvalidateMe } = useAuth();
  const [startCountdown, setStartCountdown] = useToggle(true);
  const countdown = useCountdown({ time: 30, trigger: startCountdown });
  const {
    register,
    formState: { errors },
    setError,
    setValue,
    handleSubmit,
  } = useForm<TokenConfirmationSchema>({
    resolver: yupResolver(schemaTokenConfirmation),
  });

  const {
    state: { email },
    onNewUser,
  } = useSignUpContext();

  const addEmailNonce = useMutation(
    ['create-email-nonce'],
    hasuraPublicService.protocol_add_email
  );

  const onResendEmail = async () => {
    try {
      await addEmailNonce.mutateAsync({ email });
      setStartCountdown();
    } catch (e) {
      enqueueSnackbar(e.message, {
        variant: 'error',
      });
      setStartCountdown();
    }
  };

  const signupConfirmationMutation = useMutation(
    async ({ code }: TokenConfirmationSchema) =>
      hasuraUserService.protocol_add_email_confirmation({
        code: parseInt(code, 10),
        email,
      }),
    {
      onError(error: ErrorResponse) {
        error.response?.errors?.forEach(({ message }) => {
          if (message === 'INVALID_CODE_VERIFICATION') {
            setError('code', {
              message: errorMessages.INVALID_CODE_VERIFICATION,
            });
            setValue('code', '');
          } else {
            if (message === 'MAXIMUM_ATTEMPTS_REACHED') {
              onNewUser();
            }
            enqueueSnackbar(
              errorMessages[message] || errorMessages.UNEXPECTED_ERROR,
              {
                variant: 'error',
              }
            );
          }
        });
      },
    }
  );

  const onSubmitConfirmToken = async (data: TokenConfirmationSchema) => {
    try {
      await signupConfirmationMutation.mutateAsync(data);
      onInvalidateMe();
    } catch (e) {
      enqueueSnackbar(e.message, {
        variant: 'error',
      });
    }
  };

  return (
    <Stack
      component="form"
      direction="column"
      gap={2}
      onSubmit={handleSubmit(onSubmitConfirmToken)}
    >
      <CardSummary onClickEdit={onNewUser} email={email} />
      <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
        {t('steps.verify-token.title')}
      </Typography>
      <TitleSubtitleField
        title={t('steps.verify-token.description')}
        subtitle={t('steps.verify-token.caption')}
      />
      <TextField
        required
        label={t('form.fields.code')}
        id="code"
        type="text"
        inputMode="numeric"
        {...register('code')}
        error={!!errors?.code}
        helperText={errors?.code?.message as string}
      />
      <Stack direction="row" gap={1} sx={{ mt: 2 }}>
        <LoadingButton
          variant="contained"
          type="submit"
          sx={{ height: 48 }}
          isLoading={signupConfirmationMutation.isLoading}
        >
          {t('form.verify-token-action')}
        </LoadingButton>
        <LoadingButton
          variant="outlined"
          type="button"
          sx={{ height: 48 }}
          isLoading={addEmailNonce.isLoading}
          onClick={onResendEmail}
          disabled={countdown?.counting}
        >
          {t('form.send-code-again-action')}
          {countdown?.counting ? ` (${countdown.time})` : ' '}
        </LoadingButton>
      </Stack>
    </Stack>
  );
}
