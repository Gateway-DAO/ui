import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import Loading from '@/components/atoms/loadings/loading';
import { CardSummary } from '@/components/molecules/card-summary';
import { errorMessages } from '@/constants/error-messages';
import { useAuth } from '@/providers/auth';
import { hasuraPublicService } from '@/services/hasura/api';
import {
  Login_EmailMutation,
  Protocol_Api_AuthType,
} from '@/services/hasura/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';

import { Stack } from '@mui/material';

import { MigrationModalData } from '../../migration/migration-modal';
import { EmailSchema, TokenConfirmationSchema, schemaEmail } from './schema';
import SendEmail from './sendEmail';
import VerifyToken from './verifyToken';

type Props = {
  onMigrate: (data: MigrationModalData) => void;
  onSuccess: () => void;
};

export default function AddEmail({ onSuccess, onMigrate }: Props) {
  const { hasuraUserService } = useAuth();
  const { t } = useTranslation('settings');
  const { enqueueSnackbar } = useSnackbar();
  const [sentEmail, setSentEmail] = useState(false);
  const [isMigration, setIsMigration] = useState(false);
  const [email, setEmail] = useState(null);

  const methodsAddEmail = useForm<EmailSchema>({
    resolver: yupResolver(schemaEmail),
  });

  const methodsConfirmToken = useForm<TokenConfirmationSchema>();

  const onEdit = () => {
    setSentEmail(false);
    setIsMigration(false);
  };

  const addEmail = useMutation(async (data: { email: string }) => {
    // if user is asking for resubmit a token for a existing email, keep migration
    if (isMigration) return hasuraPublicService.create_email_nonce(data);
    try {
      const res = await hasuraUserService.protocol_add_email(data);
      return res;
    } catch (e) {
      // if user is submitting a token for an existing email, set to migration
      if (e?.response?.errors?.[0]?.message === 'EMAIL_ALREADY_REGISTERED') {
        setIsMigration(true);
        return hasuraPublicService.create_email_nonce(data);
      }
      throw e;
    }
  });

  const onSubmitEmail = async (data: EmailSchema) => {
    try {
      await addEmail.mutateAsync({ email: data.email_address });
      setSentEmail(true);
      setEmail(data.email_address);
    } catch (e) {
      (e as any)?.response?.errors?.forEach(({ message }) => {
        enqueueSnackbar(
          errorMessages[message] || errorMessages.UNEXPECTED_ERROR,
          {
            variant: 'error',
          }
        );
      });
    }
  };

  const confirmToken = useMutation(async ({ code }: TokenConfirmationSchema) =>
    isMigration
      ? hasuraPublicService.login_email({
          code: parseInt(code, 10),
          email,
        })
      : hasuraUserService.protocol_add_email_confirmation({
          code: parseInt(code, 10),
          email,
        })
  );

  const onSubmitConfirmToken = async (data: TokenConfirmationSchema) => {
    try {
      const res = await confirmToken.mutateAsync(data);
      if (isMigration) {
        const { token, hasura_id } = (res as Login_EmailMutation).protocol
          .loginEmail;
        onMigrate({
          hasura_id,
          token,
          type: Protocol_Api_AuthType.Email,
          data: email,
        });
        return;
      }
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
                onClickEdit={onEdit}
                email={email}
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
                  email={email}
                />
              </FormProvider>
            </>
          )}
        </>
      )}
    </Stack>
  );
}
