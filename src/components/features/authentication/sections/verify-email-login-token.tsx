import { signIn } from 'next-auth/react';

import { errorMessages } from '@/constants/error-messages';
import { mutation } from '@/constants/queries';
import { useCountdown } from '@/hooks/use-countdown';
import { hasuraPublicService } from '@/services/hasura/api';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useToggle } from 'react-use';

import { CodeField } from '../components/code-field';
import { TokenConfirmationSchema } from '../schema';
import { useSignUpContext } from '../signup-context';

export function VerifyEmailLoginToken() {
  const { enqueueSnackbar } = useSnackbar();
  const [startCountdown, setStartCountdown] = useToggle(true);
  const countdown = useCountdown({ time: 30, trigger: startCountdown });

  const {
    state: { email },
    onReset,
  } = useSignUpContext();

  const createEmailNonce = useMutation(
    ['login-email-nonce'],
    hasuraPublicService.create_email_nonce
  );

  const onResendEmail = async () => {
    try {
      await createEmailNonce.mutateAsync({ email: email.toLowerCase() });
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
    async (data: TokenConfirmationSchema) => {
      const res = await signIn('credential-email', {
        email: email.toLowerCase(),
        code: data.code,
        redirect: false,
      });
      // TODO: Improve error handler
      if (!res.ok && res.error) {
        if (res.error?.indexOf('MAXIMUM_ATTEMPTS_REACHED') > -1) {
          onReset();
        }
        enqueueSnackbar(
          errorMessages[res.error?.split('Error: ')?.[1]?.split(':')?.[0]] ||
            errorMessages.UNEXPECTED_ERROR,
          {
            variant: 'error',
          }
        );
      }
    }
  );

  const onSubmitConfirmToken = async (data: TokenConfirmationSchema) => {
    signupConfirmationMutation.mutate(data);
  };

  return (
    <CodeField
      onClickEdit={onReset}
      onSubmitConfirmCode={onSubmitConfirmToken}
      isLoadingConfirmCode={signupConfirmationMutation.isLoading}
      onResendEmail={onResendEmail}
      isLoadingOnResend={createEmailNonce.isLoading}
      countdown={countdown}
      email={email}
    />
  );
}
