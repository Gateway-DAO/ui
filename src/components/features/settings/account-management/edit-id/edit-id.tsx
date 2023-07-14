import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import { TitleSubtitleField } from '@/components/atoms/title-field';
import { errorMessages } from '@/constants/error-messages';
import { useAuth } from '@/providers/auth';
import { ErrorResponse } from '@/types/graphql';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import { ReportProblemOutlined } from '@mui/icons-material';
import { InputAdornment, Stack, TextField, Typography } from '@mui/material';

import { GatewayIdSchema, defaultValues, UpdateGatewayId } from './schema';

export function EditId() {
  const { t } = useTranslation('settings');
  const { me, hasuraUserService, onInvalidateMe } = useAuth();
  const [updatedRecently, setUpdatedRecently] = useState(false);
  const [diffDays, setDiffDays] = useState(null);

  const {
    register,
    setError,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(GatewayIdSchema),
    defaultValues: defaultValues(me),
    mode: 'all',
  });

  const { enqueueSnackbar } = useSnackbar();

  const mutation = useMutation(
    ({ gatewayId }: UpdateGatewayId) => {
      return hasuraUserService.update_gateway_id({
        gatewayId: gatewayId,
        id: me.id,
      });
    },
    {
      onSuccess: (data) => {
        onInvalidateMe();
        enqueueSnackbar(t('account-management.username-update'));
      },

      onError(error: ErrorResponse) {
        error.response?.errors?.forEach(({ message }) => {
          if (
            message.includes('duplicate key value violates') ||
            message.includes("You don't own the gatewayId")
          ) {
            setError('gatewayId', {
              message: errorMessages.GATEWAY_ID_ALREADY_REGISTERED,
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
      },
    }
  );

  const onupdate = (data) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    if (me.protocolUser.gatewayIdUpdatedAt) {
      const now = DateTime.now();
      const limitDate = now.minus({ days: 30 });
      const updatedAt = DateTime.fromISO(me.protocolUser?.gatewayIdUpdatedAt);
      const isAllowedToEdit = updatedAt < limitDate;
      if (!isAllowedToEdit) {
        const diffInDays = now.diff(updatedAt, 'days');
        const limitToUpdate = 30;
        setDiffDays(limitToUpdate - Math.ceil(diffInDays.toObject().days));
        setUpdatedRecently(true);
      }
    }
  }, [me]);

  return (
    <Stack
      component={'form'}
      alignItems={'flex-start'}
      justifyContent="flex-start"
      onSubmit={handleSubmit(onupdate)}
    >
      <TitleSubtitleField
        title={t('account-management.gateway-id')}
        subtitle={t('account-management.gateway-id-desc')}
      />
      <Stack spacing={2} mt={3}>
        <TextField
          variant="outlined"
          type="username"
          name="gatewayId"
          disabled={updatedRecently}
          {...register('gatewayId')}
          InputProps={{
            startAdornment: <InputAdornment position="start">@</InputAdornment>,
          }}
          error={!!errors.gatewayId}
          helperText={
            errors.gatewayId?.message ??
            t('account-management.gateway-id-helper')
          }
        />
      </Stack>
      {updatedRecently && (
        <Typography
          variant="body2"
          color="#ffdca8"
          sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}
        >
          <ReportProblemOutlined />
          {errorMessages.GATEWAY_ID_UPDATED_RECENTLY.replace(
            '[days]',
            diffDays
          )}
        </Typography>
      )}
      {isDirty &&
        isValid &&
        !(getValues().gatewayId === me?.protocolUser?.gatewayId) && (
          <Stack gap={2} direction={'row'} mt={3}>
            <LoadingButton
              variant="contained"
              type="submit"
              size="large"
              isLoading={mutation.isLoading}
            >
              {t('account-management.gateway-id-action')}
            </LoadingButton>
            <LoadingButton
              variant="outlined"
              size="large"
              onClick={() => reset()}
            >
              {t('account-management.gateway-id-cancel')}
            </LoadingButton>
          </Stack>
        )}
    </Stack>
  );
}
