import useTranslation from 'next-translate/useTranslation';

import { useFormContext } from 'react-hook-form';
import { useToggle } from 'react-use';

import { Box, Stack, TextField, Typography } from '@mui/material';

import { useCountdown } from '@/hooks/use-countdown';
import { LoadingButton } from '@/components/atoms/loading-button';
import { CardSummary } from './card-summary';
import { TokenConfirmationSchema, NewUserSchema } from './schema';

type Props = {
  onSubmitConfirmToken: (data: TokenConfirmationSchema) => void;
  isLoadingConfirmToken: boolean;
  onSubmitSendEmail: (data: NewUserSchema) => void;
  isLoadingSendEmail: boolean;
  sendEmailData: NewUserSchema;
  onClickEdit: () => void;
};

export function FormVerifyToken({
  onSubmitConfirmToken,
  isLoadingConfirmToken,
  onSubmitSendEmail,
  isLoadingSendEmail,
  sendEmailData,
  onClickEdit,
}: Props) {
  const { t } = useTranslation('dashboard-new-user');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<TokenConfirmationSchema>();
  const [startCountdown, setStartCountdown] = useToggle(true);
  const countdown = useCountdown({ time: 30, trigger: startCountdown });

  const sendEmailAgain = () => {
    onSubmitSendEmail(sendEmailData);
    setStartCountdown();
  };

  return (
    <Stack
      component="form"
      direction="column"
      gap={2}
      onSubmit={handleSubmit(onSubmitConfirmToken)}
    >
      <CardSummary
        onClickEdit={() => onClickEdit()}
        filledData={sendEmailData}
      />
      <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
        {t('title-verify-token')}
      </Typography>
      <Box>
        <Typography component="h2" variant="h6" fontSize={16}>
          {t('form.title-verify-token')}
        </Typography>
        <Typography component="p" variant="caption">
          {t('form.caption-verify-token')}
        </Typography>
      </Box>
      <TextField
        required
        label={t('form.fields.code')}
        id="token"
        type="text"
        inputMode="numeric"
        {...register('token')}
        error={!!errors.token}
        helperText={errors.token?.message}
      />
      <Stack direction="row" gap={1}>
        <LoadingButton
          variant="contained"
          type="submit"
          sx={{ mt: 2, height: 48 }}
          isLoading={isLoadingConfirmToken}
        >
          {t('form.verify-token-action')}
        </LoadingButton>
        <LoadingButton
          variant="outlined"
          type="button"
          sx={{ mt: 2, height: 48 }}
          isLoading={isLoadingSendEmail}
          onClick={() => sendEmailAgain()}
          disabled={countdown?.counting}
        >
          {t('form.send-code-again-action')}
          {countdown?.counting ? ` (${countdown.time})` : ' '}
        </LoadingButton>
      </Stack>
    </Stack>
  );
}
