import useTranslation from 'next-translate/useTranslation';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import { useCountdown } from '@/hooks/use-countdown';
import { brandColors } from '@/theme';
import { useFormContext } from 'react-hook-form';
import { useToggle } from 'react-use';

import { Stack, TextField, Typography, alpha } from '@mui/material';

import { TokenConfirmationSchema, EmailSchema } from './schema';

type Props = {
  onSubmitConfirmToken: (data: TokenConfirmationSchema) => void;
  isLoadingConfirmToken: boolean;
  onSubmitSendEmail: (data: EmailSchema) => void;
  isLoadingSendEmail: boolean;
  email: string;
};

export default function VerifyToken({
  onSubmitConfirmToken,
  isLoadingConfirmToken,
  onSubmitSendEmail,
  isLoadingSendEmail,
  email,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<TokenConfirmationSchema>();

  const { t } = useTranslation('settings');

  const [startCountdown, setStartCountdown] = useToggle(true);
  const countdown = useCountdown({ time: 30, trigger: startCountdown });

  const sendEmailAgain = () => {
    onSubmitSendEmail({ email_address: email });
    setStartCountdown();
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmitConfirmToken)}
      gap={3}
    >
      <Typography sx={{ color: alpha(brandColors.white.main, 0.7) }}>
        {t('account-management.verify-token.description1')}{' '}
        <span style={{ color: brandColors.white.main }}>{email}</span>{' '}
        {t('account-management.verify-token.description2')}
      </Typography>
      <TextField
        sx={{ mb: 2 }}
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
