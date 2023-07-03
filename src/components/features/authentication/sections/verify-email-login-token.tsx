import { signIn } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';

import { errorMessages } from '@/constants/error-messages';
import { mutation } from '@/constants/queries';
import { useCountdown } from '@/hooks/use-countdown';
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

export function VerifyEmailLoginToken() {
  const { t } = useTranslation('authentication');
  const { enqueueSnackbar } = useSnackbar();
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
    onReset,
  } = useSignUpContext();

  const createEmailNonce = useMutation(
    ['create-email-nonce'],
    hasuraPublicService.create_email_nonce
  );

  const onResendEmail = async () => {
    try {
      await createEmailNonce.mutateAsync({ email });
      setStartCountdown();
    } catch (e) {
      enqueueSnackbar(e.message, {
        variant: 'error',
      });
      setStartCountdown();
    }
  };

  const signupConfirmationMutation = useMutation(
    [mutation.signup_token_verification],
    async (data: TokenConfirmationSchema) =>
      signIn('credentials', {
        name: 'email',
        email,
        code: data.code,
        redirect: false,
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
              onReset();
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

  const onSubmitConfirmToken = (data: TokenConfirmationSchema) => {
    signupConfirmationMutation.mutate(data);
  };

  return (
    <Stack
      component="form"
      direction="column"
      gap={2}
      onSubmit={handleSubmit(onSubmitConfirmToken)}
    >
      <CardSummary onClickEdit={onReset} email={email} />
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
          isLoading={createEmailNonce.isLoading}
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
