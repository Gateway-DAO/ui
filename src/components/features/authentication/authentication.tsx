import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { errorMessages } from '@/constants/error-messages';
import { useAuth } from '@/providers/auth';
import { ErrorResponse } from '@/types/graphql';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useForm, useFormContext } from 'react-hook-form';

import { Stack } from '@mui/material';

import { EmailSignUpProgress } from './components';
import { ConnectMoreAuthDialog } from './components/connect-more-auth-dialog';
import {
  NewUserSchema,
  TokenConfirmationSchema,
  schemaCreateAccount,
  schemaTokenConfirmation,
} from './schema';
import { AuthenticationMethods } from './sections/authentication-methods';
import { ChooseEmail } from './sections/choose-email';
import { ChooseGatewayId } from './sections/choose-gateway-id';

export function Authentication() {
  const { me, hasuraUserService } = useAuth();
  const { t } = useTranslation('authentication');
  const [signUpSteps, setSignUpSteps] = useState(0);
  const [sendEmailData, setSendEmailData] = useState(null);
  const [showConnectMoreAuthDialog, setShowConnectMoreAuthDialog] =
    useState(false);
  const { handleSubmit } = useFormContext<NewUserSchema>();
  const { enqueueSnackbar } = useSnackbar();

  const methodsSendEmail = useForm<NewUserSchema>({
    resolver: yupResolver(schemaCreateAccount),
    defaultValues: {
      username: me?.username ?? '',
      email_address: me?.email_address ?? '',
    },
  });
  const methodsConfirmToken = useForm<TokenConfirmationSchema>({
    resolver: yupResolver(schemaTokenConfirmation),
  });

  const signupMutation = useMutation(
    ['signup'],
    async (data: NewUserSchema) => {
      // setSendEmailData(data);
      return hasuraUserService.protocol_signup({
        email: data.email_address,
        gateway_id: data.username,
      });
    },
    {
      onSuccess(data) {
        // setSentEmail(true);
        enqueueSnackbar(
          `${t('form.code-sent-to')} ${data.protocol.signup.email}`
        );
      },
      onError(error: ErrorResponse) {
        error.response?.errors?.forEach(({ message }) => {
          if (message === 'GATEWAY_ID_ALREADY_REGISTERED') {
            methodsSendEmail.setError('username', {
              message: errorMessages.GATEWAY_ID_ALREADY_REGISTERED,
            });
          } else if (message === 'EMAIL_ALREADY_REGISTERED') {
            methodsSendEmail.setError('email_address', {
              message: errorMessages.EMAIL_ALREADY_REGISTERED,
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
      },
    }
  );

  const signupConfirmationMutation = useMutation(
    ['signupConfirmation'],
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
        // change the code to make it dynamically: here done this just to show the flow
        setShowConnectMoreAuthDialog(true);
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
              // setSentEmail(false);
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

  const onSubmitSendEmail = (data: NewUserSchema) =>
    signupMutation.mutate(data);

  const onSubmitConfirmToken = (data: TokenConfirmationSchema) =>
    signupConfirmationMutation.mutate(data);

  const signUpProgress = {
    0: <AuthenticationMethods />,
    1: <ChooseEmail />,
    2: <ChooseGatewayId />,
  };

  return (
    <>
      <Stack
        component="form"
        direction="column"
        gap={2}
        onSubmit={handleSubmit(onSubmitSendEmail)}
      >
        <EmailSignUpProgress.Provider
          value={{ setSignUpSteps, isLoading: signupMutation.isLoading }}
        >
          {signUpProgress[signUpSteps]}
        </EmailSignUpProgress.Provider>
      </Stack>
      <ConnectMoreAuthDialog
        open={showConnectMoreAuthDialog}
        setOpen={setShowConnectMoreAuthDialog}
      />
    </>
  );
}
