import { InputAdornment, Stack, TextField, Typography } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import { useSnackbar } from 'notistack';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/providers/auth';
import { useForm } from 'react-hook-form';
import { ErrorResponse } from '@/types/graphql';
import { errorMessages } from '@/constants/error-messages';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  GatewayIdSchema,
  defaultValues,
  UpdateGatewayId,
} from '../../utlis/schema';

export function EditId() {
  const { t } = useTranslation('settings');
  const { me, hasuraUserService, onInvalidateMe } = useAuth();

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
      return hasuraUserService.update_user_profile({
        username: username,
        name: me.name,
        email_address: me.email_address,
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
    console.log(data);
    mutation.mutate(data);
  };

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
          {...register('username')}
          InputProps={{
            startAdornment: <InputAdornment position="start">@</InputAdornment>,
          }}
          error={!!errors.username}
          helperText={
            errors.username?.message ??
            t('account-management.gateway-id-helper')
          }
        />
      </Stack>
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
