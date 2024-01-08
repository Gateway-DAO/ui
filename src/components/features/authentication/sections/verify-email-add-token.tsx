import { errorMessages } from '@/constants/error-messages';
import { useCountdown } from '@/hooks/use-countdown';
import { useAuth } from '@/providers/auth';
import { hasuraPublicService } from '@/services/hasura/api';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useToggle } from 'react-use';

import { CodeField } from '../components/code-field';
import { TokenConfirmationSchema } from '../schema';
import { useSignUpContext } from '../signup-context';

export function VerifyEmailAddToken() {
  const { enqueueSnackbar } = useSnackbar();
  const { hasuraUserService, onInvalidateMe } = useAuth();
  const [startCountdown, setStartCountdown] = useToggle(true);
  const countdown = useCountdown({ time: 30, trigger: startCountdown });

  const {
    state: { email },
    onNewUser,
  } = useSignUpContext();

  const addEmailNonce = useMutation(
    ['add-email-nonce'],
    hasuraPublicService.protocol_add_email
  );

  const onResendEmail = async () => {
    try {
      await addEmailNonce.mutateAsync({ email: email.toLowerCase() });
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
      })
  );

  const onSubmitConfirmToken = async (data: TokenConfirmationSchema) => {
    try {
      await signupConfirmationMutation.mutateAsync(data);
      onInvalidateMe();
    } catch (error) {
      (error.response as any)?.errors?.forEach(({ message }) => {
        if (message === 'MAXIMUM_ATTEMPTS_REACHED') {
          onNewUser();
        }
        enqueueSnackbar(
          errorMessages[message] || errorMessages.UNEXPECTED_ERROR,
          {
            variant: 'error',
          }
        );
      });
    }
  };

  return (
    <CodeField
      onClickEdit={onNewUser}
      onSubmitConfirmCode={onSubmitConfirmToken}
      isLoadingConfirmCode={signupConfirmationMutation.isLoading}
      onResendEmail={onResendEmail}
      isLoadingOnResend={addEmailNonce.isLoading}
      countdown={countdown}
      email={email}
    />
  );
}
