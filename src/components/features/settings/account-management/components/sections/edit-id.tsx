import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import { errorMessages } from '@/constants/error-messages';
import { useAuth } from '@/providers/auth';
import { brandColors } from '@/theme';
import { ErrorResponse } from '@/types/graphql';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import { ReportProblemOutlined } from '@mui/icons-material';
import {
  InputAdornment,
  Stack,
  TextField,
  Typography,
  alpha,
} from '@mui/material';

import {
  GatewayIdSchema,
  defaultValues,
  UpdateGatewayId,
} from '../../utlis/schema';

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
    mode: 'onBlur',
  });

  const { enqueueSnackbar } = useSnackbar();

  const mutation = useMutation(
    ({ username }: UpdateGatewayId) => {
      return hasuraUserService.update_gateway_id({
        gatewayId: username,
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
          if (message.includes('Uniqueness violation')) {
            setError('username', {
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
      <Typography variant="subtitle1" sx={{ color: 'white' }} gutterBottom>
        {t('account-management.gateway-id')}
      </Typography>
      <Typography variant="caption" gutterBottom>
        {t('account-management.gateway-id-desc')}
      </Typography>
      <Stack spacing={2} mt={3}>
        <TextField
          variant="outlined"
          type="username"
          name="username"
          disabled={updatedRecently}
          {...register('username')}
          InputProps={{
            startAdornment: <InputAdornment position="start">@</InputAdornment>,
          }}
          error={!!errors.username}
          helperText={
            !updatedRecently
              ? errors.username?.message ??
                t('account-management.gateway-id-helper')
              : ''
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
      {isDirty && isValid && !(getValues().username === me?.username) && (
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
