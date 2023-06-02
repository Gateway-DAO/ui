import useTranslation from 'next-translate/useTranslation';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import { useCountdown } from '@/hooks/use-countdown';
import { useFormContext } from 'react-hook-form';
import { useToggle } from 'react-use';

import { Stack, TextField, Typography } from '@mui/material';

import { TokenConfirmationSchema, SendEmailSchema } from '../schema';

type Props = {
  onSubmitConfirmToken: (data: TokenConfirmationSchema) => void;
  isLoadingConfirmToken: boolean;
  onSubmitSendEmail: (data: SendEmailSchema) => void;
  isLoadingSendEmail: boolean;
  sendEmailData: SendEmailSchema;
};

export default function VerifyToken({
  onSubmitConfirmToken,
  isLoadingConfirmToken,
  onSubmitSendEmail,
  isLoadingSendEmail,
  sendEmailData,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useFormContext<TokenConfirmationSchema>();

  const { t } = useTranslation('settings');

  const [startCountdown, setStartCountdown] = useToggle(true);
  const countdown = useCountdown({ time: 30, trigger: startCountdown });

  const sendEmailAgain = () => {
    onSubmitSendEmail(sendEmailData);
    setStartCountdown();
  };

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmitConfirmToken)}>
      <Stack sx={{ width: '100%', mb: 4 }}>
        <Typography fontSize="16px" sx={{ fontWeight: 600 }}>
          {t('account-management.verify-your-email-title')}
        </Typography>
        <Typography variant="body2" fontSize="12px">
          {t('account-management.verify-your-email-description')}
        </Typography>
      </Stack>
      <TextField
        sx={{ width: '315px', mb: 2 }}
        variant="outlined"
        type="text"
        name="code"
        error={!!errors?.code}
        helperText={errors.code?.message}
        {...register('code', { required: true })}
        placeholder={t('account-management.code-placeholder')}
      />
      <Stack direction="row">
        <LoadingButton
          variant="contained"
          type="submit"
          isLoading={isLoadingConfirmToken}
          sx={{
            height: 48,
            mr: 1,
          }}
          disabled={!isValid}
        >
          {t('account-management.code-action')}
        </LoadingButton>
        <LoadingButton
          variant="outlined"
          type="button"
          disabled={countdown?.counting}
          sx={{ height: 48 }}
          isLoading={isLoadingSendEmail}
          onClick={() => sendEmailAgain()}
        >
          {t('account-management.code-send-again')}{' '}
          {countdown?.counting ? ` (${countdown.time})` : ' '}
        </LoadingButton>
      </Stack>
    </Stack>
  );
}
