import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import Loading from '@/components/atoms/loadings/loading';
import { NavBarAvatar } from '@/components/organisms/navbar/navbar-avatar';
import { errorMessages } from '@/constants/error-messages';
import { useAuth } from '@/providers/auth';
import { theme } from '@/theme';
import { ErrorResponse } from '@/types/graphql';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useForm, FormProvider } from 'react-hook-form';

import CloseIcon from '@mui/icons-material/Close';
import { alpha, Avatar, Box, Stack } from '@mui/material';

import { FormSendEmail } from './forms/form-send-email';
import { FormVerifyToken } from './forms/form-verify-token';
import { ConnectMoreAuthDialog } from './utlis/connect-more-auth-dialog';
import {
  schemaCreateAccount,
  schemaTokenConfirmation,
  NewUserSchema,
  TokenConfirmationSchema,
  defaultValuesCreateAccount,
} from './utlis/schema';

export function Signup() {
  const { t } = useTranslation('dashboard-new-user');
  const [showConnectMoreAuthDialog, setShowConnectMoreAuthDialog] =
    useState(false);
  const { me, hasuraUserService, onInvalidateMe } = useAuth();
  const [sentEmail, setSentEmail] = useState(false);
  const [sendEmailData, setSendEmailData] = useState(null);
  const [profileCreated, setProfileCreated] = useState(false);
  const methodsSendEmail = useForm<NewUserSchema>({
    resolver: yupResolver(schemaCreateAccount),
    defaultValues: defaultValuesCreateAccount(me),
  });
  const methodsConfirmToken = useForm<TokenConfirmationSchema>({
    resolver: yupResolver(schemaTokenConfirmation),
  });

  const { enqueueSnackbar } = useSnackbar();

  const signupMutation = useMutation(
    ['signup'],
    async (data: NewUserSchema) => {
      setSendEmailData(data);
      return hasuraUserService.protocol_signup({
        email: data.email_address,
        gateway_id: data.username,
      });
    },
    {
      onSuccess(data) {
        setSentEmail(true);
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
              setSentEmail(false);
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
        <Avatar sx={{ width: 40, height: 40, alignSelf: 'center' }}>
          <CloseIcon />
        </Avatar>
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
          borderRight: '1px solid rgba(229, 229, 229, 0.12)',
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
        {profileCreated ? (
          <Loading />
        ) : (
          <>
            {!sentEmail ? (
              <FormProvider {...methodsSendEmail}>
                <FormSendEmail
                  onSubmitSendEmail={onSubmitSendEmail}
                  isLoading={signupMutation.isLoading}
                />
              </FormProvider>
            ) : (
              <FormProvider {...methodsConfirmToken}>
                <FormVerifyToken
                  onSubmitConfirmToken={onSubmitConfirmToken}
                  isLoadingConfirmToken={signupConfirmationMutation.isLoading}
                  onSubmitSendEmail={onSubmitSendEmail}
                  isLoadingSendEmail={signupMutation.isLoading}
                  sendEmailData={sendEmailData}
                  onClickEdit={() => setSentEmail(false)}
                />
              </FormProvider>
            )}
            <ConnectMoreAuthDialog
              open={showConnectMoreAuthDialog}
              setOpen={setShowConnectMoreAuthDialog}
            />
          </>
        )}
      </Stack>
    </Stack>
  );
}
