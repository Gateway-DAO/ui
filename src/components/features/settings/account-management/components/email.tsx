import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { errorMessages } from '@/constants/error-messages';
import { query } from '@/constants/queries';
import { useAuth } from '@/providers/auth';
import { ErrorResponse } from '@/types/graphql';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';

import { Stack } from '@mui/material';

import {
  SendEmailSchema,
  TokenConfirmationSchema,
  schemaSendEmail,
  schemaTokenConfirmation,
} from '../schema';
import SendEmail from './sendEmail';
import VerifyToken from './verifyToken';

export default function Email() {
  const { me, hasuraUserService, onInvalidateMe, onUpdateMe } = useAuth();
  const { t } = useTranslation('settings');
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [actualEmail, setActualEmail] = useState(me?.email_address);
  const [sentEmail, setSentEmail] = useState(false);
  const [sendEmailData, setSendEmailData] = useState(null);
  const methodsSendEmail = useForm<SendEmailSchema>({
    resolver: yupResolver(schemaSendEmail),
    mode: 'onChange',
    defaultValues: {
      email: actualEmail,
    },
  });
  const methodsConfirmToken = useForm<TokenConfirmationSchema>({
    resolver: yupResolver(schemaTokenConfirmation),
    mode: 'onChange',
  });

  const sendEmailMutation = useMutation(
    [query.create_code_change_email],
    async ({ ...data }: SendEmailSchema) => {
      setSendEmailData(data);
      return hasuraUserService.create_code({
        user_id: me?.id,
        email: data.email,
      });
    },
    {
      onSuccess() {
        setSentEmail(true);
        enqueueSnackbar(
          `${t('account-management.email-sent')} ${
            methodsSendEmail.getValues().email
          }`
        );
      },
      onError(error: ErrorResponse) {
        error.response?.errors?.forEach(({ message }) => {
          if (message === 'EMAIL_ALREADY_REGISTERED') {
            methodsSendEmail.setError('email', {
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

  const confirmTokenMutation = useMutation(
    [query.confirm_token_change_email],
    async ({ ...data }: TokenConfirmationSchema) => {
      return hasuraUserService.verify_code({
        user_id: me?.id,
        email: methodsSendEmail.getValues().email,
        code: data.code,
      });
    },
    {
      onSuccess() {
        enqueueSnackbar(t('account-management.email-verified'));
        setSentEmail(false);
        setActualEmail(methodsSendEmail.getValues().email);
        onUpdateMe((oldMe) => {
          return {
            ...oldMe,
            email_address: actualEmail,
          };
        });
        onInvalidateMe();
        methodsConfirmToken.reset();
        router.replace(router.asPath);
      },
      onError(error: ErrorResponse) {
        error.response?.errors?.forEach(({ message }) => {
          if (message === 'INVALID_CODE_VERIFICATION') {
            methodsConfirmToken.setError('code', {
              message: errorMessages.INVALID_CODE_VERIFICATION,
            });
          } else {
            if (message === 'MAXIMUM_ATTEMPTS_REACHED') {
              methodsConfirmToken.setError('code', {
                message: errorMessages.MAXIMUM_ATTEMPTS_REACHED,
              });
            } else if (message === 'EXPIRED_CODE') {
              methodsConfirmToken.setError('code', {
                message: errorMessages.EXPIRED_CODE,
              });
            }
            setSentEmail(false);
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

  const onSubmitSendEmail = (data: SendEmailSchema) =>
    sendEmailMutation.mutate(data);

  const onSubmitConfirmToken = (data: TokenConfirmationSchema) =>
    confirmTokenMutation.mutate(data);

  return (
    <Stack sx={{ mb: 4 }}>
      <FormProvider {...methodsSendEmail}>
        <SendEmail
          onSubmitSendEmail={onSubmitSendEmail}
          isLoading={sendEmailMutation.isLoading}
          showButton={
            methodsSendEmail.formState.isDirty &&
            methodsSendEmail.formState.isValid &&
            !sentEmail &&
            methodsSendEmail.getValues().email !== actualEmail
          }
          disabledField={sentEmail}
        />
      </FormProvider>
      {sentEmail && (
        <FormProvider {...methodsConfirmToken}>
          <VerifyToken
            onSubmitConfirmToken={onSubmitConfirmToken}
            isLoadingConfirmToken={confirmTokenMutation.isLoading}
            onSubmitSendEmail={onSubmitSendEmail}
            isLoadingSendEmail={sendEmailMutation.isLoading}
            sendEmailData={sendEmailData}
          />
        </FormProvider>
      )}
    </Stack>
  );
}
