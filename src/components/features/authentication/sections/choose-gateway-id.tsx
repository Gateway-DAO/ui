import useTranslation from 'next-translate/useTranslation';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import { errorMessages } from '@/constants/error-messages';
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
    setError,
  } = useForm<GatewayIdSchema>();

  const { onCompleteLogin } = useSignUpContext();

  const sendGatewayId = useMutation(hasuraUserService.update_gateway_id);

  const onSubmit = async ({ gatewayId }: GatewayIdSchema) => {
    try {
      await sendGatewayId.mutateAsync({
        id: me.id,
        gatewayId,
      });
      await onInvalidateMe();
      onCompleteLogin();
    } catch (e) {
      (e as any)?.response?.errors?.forEach(({ message }) => {
        // TODO: Improve error handler
        if (message.indexOf(`You don't own the gatewayId`) > -1) {
          message = 'GATEWAY_ID_ALREADY_REGISTERED';
          setError('gatewayId', {
            type: 'manual',
            message: errorMessages['GATEWAY_ID_ALREADY_REGISTERED'],
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

  return (
    <>
      <Stack
        component="form"
        gap={2}
        direction={'column'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
          {t('steps.choose-gateway-id.title')}
        </Typography>
        <TitleSubtitleField
          title={t('steps.choose-gateway-id.title-send-email')}
          subtitle={t('steps.choose-gateway-id.caption-send-email')}
        />
        <TextField
          required
          label={t('steps.choose-gateway-id.label')}
          id="gatewayId"
          {...register('gatewayId')}
          error={!!errors.gatewayId}
          helperText={
            errors.gatewayId?.message ??
            t('steps.choose-gateway-id.helper-text')
          }
        />

        <LoadingButton
          variant="contained"
          type="submit"
          sx={{ mt: 2, height: 48 }}
          isLoading={sendGatewayId.isLoading}
        >
          {t('steps.choose-gateway-id.btn')}
        </LoadingButton>
      </Stack>
    </>
  );
}
