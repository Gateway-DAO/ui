import useTranslation from 'next-translate/useTranslation';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import { useFormContext } from 'react-hook-form';

import { Stack, TextField, Typography } from '@mui/material';

import { TitleSubtitleField } from '../components/title-field';
import { GatewayIdSchema } from '../schema';
import { useSignUpContext } from '../signup-context';

export function ChooseGatewayId() {
  const { t } = useTranslation('authentication');
  const {
    register,
    formState: { errors },
  } = useFormContext<GatewayIdSchema>();

  const { setSignUpSteps } = useSignUpContext();

  if (errors.username?.message) {
    setSignUpSteps(0);
  }

  return (
    <>
      <Stack gap={2} direction={'column'}>
        <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
          {t('form.gateway-id.title')}
        </Typography>
        <TitleSubtitleField
          title={t('form.gateway-id.title-send-email')}
          subtitle={t('form.gateway-id.caption-send-email')}
        />
        <TextField
          required
          label={t('form.fields.gateway-id')}
          id="username"
          {...register('username')}
          error={!!errors.username}
          helperText={
            errors.username?.message ?? t('form.fields.gateway-id-helper-text')
          }
        />

        <LoadingButton
          variant="contained"
          type="submit"
          sx={{ mt: 2, height: 48 }}
          isLoading={false} // Add isLoading
          onClick={() => {
            if (errors.username?.message) {
              setSignUpSteps(0);
            }
          }}
        >
          {t('form.gateway-id.btn')}
        </LoadingButton>
      </Stack>
    </>
  );
}
