import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import {
  EmailSchema,
  schemaEmail,
} from '@/components/features/authentication/schema';
import { errorMessages } from '@/constants/error-messages';
import { mutation } from '@/constants/queries';
import { useAuth } from '@/providers/auth';
import { hasuraPublicService } from '@/services/hasura/api';
import { ErrorResponse } from '@/types/graphql';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

export function useSignupEmail() {
  const { hasuraUserService, me } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [onSuccessMutation, setOnSuccessMutation] = useState(false);
  const [sendEmailData, setSendEmailData] = useState(null);
  const { t } = useTranslation('authentication');

  const methodsEmail = useForm<EmailSchema>({
    resolver: yupResolver(schemaEmail),
    defaultValues: {
      email_address: me?.email_address ?? '',
    },
  });

  const signupEmailMutation = useMutation(
    [mutation.signup_email],
    async (data: EmailSchema) => {
      setSendEmailData(data);
      return hasuraUserService.protocol_signup({
        gateway_id: me?.id, // change backend to receive id
        email: data.email_address,
      });
    },
    {
      onSuccess(data) {
        setOnSuccessMutation(true);
        enqueueSnackbar(
          `${t('form.code-sent-to')} ${data.protocol.signup.email}`
        );
      },
      onError(error: ErrorResponse) {
        error.response?.errors?.forEach(({ message }) => {
          if (message === 'EMAIL_ALREADY_REGISTERED') {
            methodsEmail.setError('email_address', {
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

  return {
    signupEmailMutation,
    methodsEmail,
    onSuccessMutation,
    setSendEmailData,
    sendEmailData,
  };
}

export function useAuthenticationEmail() {
  const createEmailNonce = useMutation(
    ['create-email-nonce'],
    hasuraPublicService.create_email_nonce
  );

  return {
    createEmailNonce,
  };
}
