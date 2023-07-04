import useTranslation from 'next-translate/useTranslation';

import { CountdownType } from '@/hooks/use-countdown';
import { useForm } from 'react-hook-form';

import { Stack, TextField, Typography } from '@mui/material';

import { LoadingButton } from '../../../atoms/buttons/loading-button';
import { TokenConfirmationSchema } from '../schema';
import { CardSummary } from './card-summary';
import { TitleSubtitleField } from './title-field';

type Props = {
  onClickEdit: () => void;
  onSubmitConfirmCode: (data: TokenConfirmationSchema) => Promise<void>;
  isLoadingConfirmCode: boolean;
  onResendEmail: () => void;
  isLoadingOnResend: boolean;
  countdown: CountdownType;
  email: string;
};

export function CodeField({
  onClickEdit,
  onSubmitConfirmCode,
  isLoadingConfirmCode,
  onResendEmail,
  isLoadingOnResend,
  countdown,
  email,
}: Props) {
  const { t } = useTranslation('authentication');
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TokenConfirmationSchema>();

  return (
    <Stack
      component="form"
      direction="column"
      gap={2}
      onSubmit={handleSubmit(onSubmitConfirmCode)}
    >
      <CardSummary onClickEdit={onClickEdit} email={email} />
      <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
        {t('steps.verify-token.title')}
      </Typography>
      <TitleSubtitleField
        title={t('steps.verify-token.description')}
        subtitle={t('steps.verify-token.caption')}
      />
      <TextField
        required
        label={t('steps.verify-token.label')}
        id="code"
        type="text"
        inputMode="numeric"
        {...register('code')}
        error={!!errors?.code}
        helperText={errors?.code?.message as string}
      />
      <Stack direction="row" gap={1} sx={{ mt: 2 }}>
        <LoadingButton
          variant="contained"
          type="submit"
          sx={{ height: 48 }}
          isLoading={isLoadingConfirmCode}
        >
          {t('steps.verify-token.action')}
        </LoadingButton>
        <LoadingButton
          variant="outlined"
          type="button"
          sx={{ height: 48 }}
          isLoading={isLoadingOnResend}
          onClick={onResendEmail}
          disabled={countdown?.counting}
        >
          {t('steps.verify-token.send-code-again')}
          {countdown?.counting ? ` (${countdown.time})` : ' '}
        </LoadingButton>
      </Stack>
    </Stack>
  );
}
