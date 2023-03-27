import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useForm, FormProvider } from 'react-hook-form';

import { theme } from '@gateway/theme';

import { alpha, Box, Stack } from '@mui/material';

import { useAuth } from '../../../providers/auth';
import { ErrorResponse } from '../../../types/graphql';
import { NavBarAvatar } from '../../organisms/navbar/navbar-avatar';
import { taskErrorMessages } from '../../organisms/tasks/task-error-messages';
import { FormSendEmail } from './form-send-email';
import { FormVerifyToken } from './form-verify-token';
import {
  schemaCreateAccount,
  schemaTokenConfirmation,
  NewUserSchema,
  TokenConfirmationSchema,
  defaultValues,
} from './schema';

export function NewUserTemplate() {
  const { t } = useTranslation('dashboard-new-user');
  const { me, gqlAuthMethods, gqlProtocolAuthMethods, onInvalidateMe } =
    useAuth();
  const [sentEmail, setSentEmail] = useState(false);
  const [sendEmailData, setSendEmailData] = useState(null);
  const methodsSendCode = useForm<NewUserSchema>({
    resolver: yupResolver(schemaCreateAccount),
    defaultValues: defaultValues(me),
  });
  const methodsSendToken = useForm<TokenConfirmationSchema>({
    resolver: yupResolver(schemaTokenConfirmation),
  });

  const { enqueueSnackbar } = useSnackbar();

  // const uploadImage = useUploadImage();

  const updateMutation = useMutation(
    ['updateProfile', me.id],
    async ({ ...data }: NewUserSchema) => {
      return gqlProtocolAuthMethods.updateUser({
        email: data.email_address,
        gatewayId: data.username,
      });
    },
    {
      onSuccess() {
        enqueueSnackbar(t('profile-created-sucess'));
        onInvalidateMe();
      },
      onError(error: ErrorResponse) {
        let totalUnmappedErrors = 0;
        error.response.errors?.forEach(({ message, extensions }) => {
          if (
            extensions.code === 'constraint-violation' &&
            message.includes('users_email_address_uindex')
          ) {
            return methodsSendCode.setError('email_address', {
              message: taskErrorMessages.EMAIL_ALREADY_IN_USE,
            });
          }
          if (
            extensions.code === 'constraint-violation' &&
            message.includes('user_username_uindex')
          ) {
            return methodsSendCode.setError('username', {
              message: taskErrorMessages.USERNAME_ALREADY_IN_USE,
            });
          }
          totalUnmappedErrors++;
        });

        if (totalUnmappedErrors) {
          enqueueSnackbar(taskErrorMessages.UNEXPECTED_ERROR, {
            variant: 'error',
          });
        }
      },
    }
  );

  const onSubmitSendEmail = (data: NewUserSchema) =>
    updateMutation.mutate(data);

  const onSubmitConfirmToken = (data: any) => updateMutation.mutate(data);

  return (
    <Stack
      sx={{
        backgroundImage: 'url(/images/signup-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        height: '100%',
      }}
    >
      <Stack
        sx={{
          position: 'absolute',
          top: { xs: 10, md: 38 },
          right: { xs: 20, md: 48 },
          zIndex: 1,
        }}
      >
        <NavBarAvatar hideProfile />
      </Stack>
      <Stack
        gap={2}
        sx={{
          maxWidth: { xs: '100%', md: '50%', lg: '582px' },
          width: '100%',
          backdropFilter: 'blur(25px)',
          px: { xs: 2, md: 6 },
          justifyContent: 'center',
          height: '100%',
          background: alpha(theme.palette.common.black, 0.03),
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: { xs: 20, md: 48 },
            left: { xs: 20, md: 48 },
          }}
        >
          <img
            src="/favicon-192.png"
            alt={t('logo-alternative-text')}
            width="30"
          />
        </Box>
        {!sentEmail ? (
          <FormProvider {...methodsSendCode}>
            <FormSendEmail
              // onSubmitSendEmail={onSubmitSendEmail}
              onSubmitSendEmail={(data) => {
                setSendEmailData(data);
                setSentEmail(true);
              }}
              isLoading={updateMutation.isLoading}
            />
          </FormProvider>
        ) : (
          <FormProvider {...methodsSendToken}>
            <FormVerifyToken
              onSubmitConfirmToken={onSubmitConfirmToken}
              isLoadingConfirmToken={updateMutation.isLoading}
              onSubmitSendEmail={onSubmitSendEmail}
              isLoadingSendEmail={updateMutation.isLoading}
              sendEmailData={sendEmailData}
              onClickEdit={() => setSentEmail(false)}
            />
          </FormProvider>
        )}
      </Stack>
    </Stack>
  );
}
