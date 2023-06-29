import useTranslation from 'next-translate/useTranslation';

import { errorMessages } from '@/constants/error-messages';
import { mutation } from '@/constants/queries';
import { useCountdown } from '@/hooks/use-countdown';
import { useSignupEmail } from '@/hooks/use-signup-email';
import { useAuth } from '@/providers/auth';
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
import {
  TokenConfirmationSchema,
  EmailSchema,
  schemaTokenConfirmation,
} from '../schema';

type Props = {
  navigateStep: (step: number) => void;
};

export function VerifyToken({ navigateStep }: Props) {
  const { me, hasuraUserService } = useAuth();
  const { t } = useTranslation('authentication');
  const { enqueueSnackbar } = useSnackbar();
  const [startCountdown, setStartCountdown] = useToggle(true);
  const countdown = useCountdown({ time: 30, trigger: startCountdown });

  const { signupEmailMutation, sendEmailData } = useSignupEmail();

  const onSubmitEmail = (data: EmailSchema) => signupEmailMutation.mutate(data);

  const sendEmailAgain = () => {
    onSubmitEmail(sendEmailData);
    setStartCountdown();
  };

  const methodsConfirmToken = useForm<TokenConfirmationSchema>({
    resolver: yupResolver(schemaTokenConfirmation),
  });

  const signupConfirmationMutation = useMutation(
    [mutation.signup_token_verification],
    async (data: TokenConfirmationSchema) => {
      return hasuraUserService.protocol_signup_confirmation({
        code: parseInt(data.token, 10),
        gateway_id: sendEmailData.username,
        email: sendEmailData.email_address,
        wallet: me?.wallet,
      });
    },
    {
      onSuccess() {
        enqueueSnackbar(t('form.profile-created'));
        navigateStep(3);
      },
      onError(error: ErrorResponse) {
        error.response?.errors?.forEach(({ message }) => {
          if (message === 'INVALID_CODE_VERIFICATION') {
            methodsConfirmToken.setError('token', {
              message: errorMessages.INVALID_CODE_VERIFICATION,
            });
          } else {
            if (message === 'MAXIMUM_ATTEMPTS_REACHED') {
              methodsConfirmToken.setValue('token', '');
              navigateStep(1);
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

  const onSubmitConfirmToken = (data: TokenConfirmationSchema) =>
    signupConfirmationMutation.mutate(data);

  return (
    <Stack
      component="form"
      direction="column"
      gap={2}
      onSubmit={methodsConfirmToken?.handleSubmit(onSubmitConfirmToken)}
    >
      <CardSummary
        onClickEdit={() => navigateStep(0)}
        filledData={sendEmailData}
      />
      <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
        {t('title-verify-token')}
      </Typography>
      <TitleSubtitleField
        title={t('form.title-verify-token')}
        subtitle={t('form.caption-verify-token')}
      />
      <TextField
        required
        label={t('form.fields.code')}
        id="token"
        type="text"
        inputMode="numeric"
        {...methodsConfirmToken?.register('token')}
        error={!!methodsConfirmToken?.formState?.errors?.token}
        helperText={
          methodsConfirmToken?.formState?.errors?.token?.message as string
        }
      />
      <Stack direction="row" gap={1}>
        <LoadingButton
          variant="contained"
          type="submit"
          sx={{ mt: 2, height: 48 }}
          isLoading={signupConfirmationMutation?.isLoading}
        >
          {t('form.verify-token-action')}
        </LoadingButton>
        <LoadingButton
          variant="outlined"
          type="button"
          sx={{ mt: 2, height: 48 }}
          isLoading={signupEmailMutation?.isLoading}
          onClick={() => sendEmailAgain()}
          disabled={countdown?.counting}
        >
          {t('form.send-code-again-action')}
          {countdown?.counting ? ` (${countdown.time})` : ' '}
        </LoadingButton>
      </Stack>
    </Stack>
  );
}
