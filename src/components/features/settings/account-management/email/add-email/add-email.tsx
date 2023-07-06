import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import Loading from '@/components/atoms/loadings/loading';
import { CardSummary } from '@/components/molecules/card-summary';
import { errorMessages } from '@/constants/error-messages';
import { useAuth } from '@/providers/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';

import { Stack } from '@mui/material';

import { EmailSchema, TokenConfirmationSchema, schemaEmail } from './schema';
import SendEmail from './sendEmail';
import VerifyToken from './verifyToken';

type Props = {
  onSuccess: () => void;
};

export default function AddEmail({ onSuccess }: Props) {
  const { hasuraUserService } = useAuth();
  const { t } = useTranslation('settings');
  const { enqueueSnackbar } = useSnackbar();
  const [sentEmail, setSentEmail] = useState(false);
  const [sendEmailData, setSendEmailData] = useState(null);

  const methodsAddEmail = useForm<EmailSchema>({
    resolver: yupResolver(schemaEmail),
  });

  const methodsConfirmToken = useForm<TokenConfirmationSchema>();

  const addEmail = useMutation(hasuraUserService.protocol_add_email);

  const onSubmitEmail = async (data: EmailSchema) => {
    try {
      await addEmail.mutateAsync({ email: data.email_address });
      setSentEmail(true);
      setSendEmailData(data);
    } catch (e) {
      (e as any)?.response?.errors?.forEach(({ message }) => {
        if (message === 'EMAIL_ALREADY_REGISTERED') {
          methodsAddEmail.setError('email_address', {
            type: 'manual',
            message: errorMessages[message],
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
    }
  };

  const confirmToken = useMutation(async ({ code }: TokenConfirmationSchema) =>
    hasuraUserService.protocol_add_email_confirmation({
      code: parseInt(code, 10),
      email: sendEmailData?.email_address,
    })
  );

  const onSubmitConfirmToken = async (data: TokenConfirmationSchema) => {
    try {
      await confirmToken.mutateAsync(data);
      setSentEmail(false);
      onSuccess();
    } catch (error) {
      (error.response as any)?.errors?.forEach(({ message }) => {
        if (message === 'MAXIMUM_ATTEMPTS_REACHED') {
          setSentEmail(false);
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
    <Stack sx={{ mb: 4, pt: 2 }}>
      {confirmToken?.isLoading ? (
        <Loading />
      ) : (
        <>
          {!sentEmail ? (
            <FormProvider {...methodsAddEmail}>
              <SendEmail
                onSubmitSendEmail={onSubmitEmail}
                isLoading={addEmail.isLoading}
                disabledField={sentEmail}
              />
            </FormProvider>
          ) : (
            <>
              <CardSummary
                title={t('account-management.verify-token.card-summary-title')}
                onClickEdit={() => setSentEmail(false)}
                email={sendEmailData?.email_address}
                sxProps={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  mb: 5,
                }}
              />
              <FormProvider {...methodsConfirmToken}>
                <VerifyToken
                  onSubmitConfirmToken={onSubmitConfirmToken}
                  isLoadingConfirmToken={confirmToken.isLoading}
                  onSubmitSendEmail={onSubmitEmail}
                  isLoadingSendEmail={addEmail.isLoading}
                  sendEmailData={sendEmailData}
                />
              </FormProvider>
            </>
          )}
        </>
      )}
    </Stack>
  );
}
