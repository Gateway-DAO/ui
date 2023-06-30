import useTranslation from 'next-translate/useTranslation';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import { useAuth } from '@/providers/auth';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import { Stack, TextField, Typography } from '@mui/material';

import { TitleSubtitleField } from '../components/title-field';
import { GatewayIdSchema } from '../schema';
import { useSignUpContext } from '../signup-context';

export function ChooseGatewayId() {
  const { t } = useTranslation('authentication');
  const { me, hasuraUserService, onInvalidateMe } = useAuth();

  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<GatewayIdSchema>();

  // const {
  //   state: { email },
  // } = useSignUpContext();

  const sendGatewayId = useMutation(
    ['new-user-gateway-id', me.id],
    hasuraUserService.protocol_signup
  );

  const onSubmit = ({ gatewayId }: GatewayIdSchema) => {
    try {
      sendGatewayId.mutateAsync({
        gateway_id: gatewayId,
      });
      onInvalidateMe();
    } catch (e) {
      enqueueSnackbar(e.message, {
        variant: 'error',
      });
    }
  };

  return (
    <>
      <Stack
        component="form"
        gap={2}
        direction={'column'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
          {t('form.gateway-id.title')}
        </Typography>
        <TitleSubtitleField
          title={t('form.gateway-id.title-send-email')}
          subtitle={t('form.gateway-id.caption-send-email')}
        />
        {/* TODO: add validation if username exists */}
        <TextField
          required
          label={t('form.fields.gateway-id')}
          id="gatewayId"
          {...register('gatewayId')}
          error={!!errors.gatewayId}
          helperText={
            errors.gatewayId?.message ?? t('form.fields.gateway-id-helper-text')
          }
        />

        <LoadingButton
          variant="contained"
          type="submit"
          sx={{ mt: 2, height: 48 }}
          isLoading={sendGatewayId.isLoading}
        >
          {t('form.gateway-id.btn')}
        </LoadingButton>
      </Stack>
    </>
  );
}
