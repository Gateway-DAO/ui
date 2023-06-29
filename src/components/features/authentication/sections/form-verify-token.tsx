import useTranslation from 'next-translate/useTranslation';

import { useCountdown } from '@/hooks/use-countdown';
import { useFormContext } from 'react-hook-form';
import { useToggle } from 'react-use';

import { Stack, TextField, Typography } from '@mui/material';

import { LoadingButton } from '../../../atoms/buttons/loading-button';
import { CardSummary } from '../components/card-summary';
import { TitleSubtitleField } from '../components/title-field';
import { TokenConfirmationSchema, NewUserSchema } from '../schema';

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
  const { t } = useTranslation('authentication');
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
      <TitleSubtitleField
        title={t('form.title-verify-token')}
        subtitle={t('form.caption-verify-token')}
      />
      <TextField
        required
        label={t('form.fields.code')}
        id="token"
        type="text"
        inputMode="numeric"
        {...register('token')}
        error={!!errors.token}
        helperText={errors.token?.message as string}
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
