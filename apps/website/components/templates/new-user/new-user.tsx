import useTranslation from 'next-translate/useTranslation';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useForm, FormProvider } from 'react-hook-form';

import { theme } from '@gateway/theme';

import { alpha, Box, Stack, Typography } from '@mui/material';

import { useAuth } from '../../../providers/auth';
import { ErrorResponse } from '../../../types/graphql';
import { NavBarAvatar } from '../../organisms/navbar/navbar-avatar';
import { taskErrorMessages } from '../../organisms/tasks/task-error-messages';
import { Form } from './form';
import { schema, NewUserSchema, defaultValues } from './schema';

export function NewUserTemplate() {
  const { t } = useTranslation('dashboard-new-user');
  const { me, gqlAuthMethods, gqlProtocolAuthMethods, onInvalidateMe } =
    useAuth();
  const methods = useForm<NewUserSchema>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues(me),
  });

  const { enqueueSnackbar } = useSnackbar();

  // const uploadImage = useUploadImage();

  const updateMutation = useMutation(
    ['updateProfile', me.id],
    async ({ ...data }: NewUserSchema) => {
      // let uploadedPicture = null;

      // if (pfp) {
      //   uploadedPicture = await uploadImage({
      //     base64: pfp,
      //     name: `${me.id}-pfp`,
      //   });
      // }

      // await gqlAuthMethods.update_user_profile({
      //   ...data,
      //   id: me.id,
      //   ...(uploadedPicture && { pic_id: uploadedPicture.upload_image.id }),
      // });
      return gqlProtocolAuthMethods.updateUser({
        email: data.email_address,
        gatewayId: data.username,
      });
    },
    {
      onSuccess() {
        enqueueSnackbar(t('profile-created-sucess'));
        onInvalidateMe();
      },
      onError(error: ErrorResponse) {
        let totalUnmappedErrors = 0;
        error.response.errors?.forEach(({ message, extensions }) => {
          if (
            extensions.code === 'constraint-violation' &&
            message.includes('users_email_address_uindex')
          ) {
            return methods.setError('email_address', {
              message: taskErrorMessages.EMAIL_ALREADY_IN_USE,
            });
          }
          if (
            extensions.code === 'constraint-violation' &&
            message.includes('user_username_uindex')
          ) {
            return methods.setError('username', {
              message: taskErrorMessages.USERNAME_ALREADY_IN_USE,
            });
          }
          totalUnmappedErrors++;
        });

        if (totalUnmappedErrors) {
          enqueueSnackbar(taskErrorMessages.UNEXPECTED_ERROR, {
            variant: 'error',
          });
        }
      },
    }
  );

  const onSubmit = (data: NewUserSchema) => updateMutation.mutate(data);

  return (
    <Stack
      sx={{
        backgroundImage: 'url(/images/signup-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        height: '100%',
      }}
    >
      <Stack
        sx={{
          position: 'absolute',
          top: { xs: 10, md: 38 },
          right: { xs: 20, md: 48 },
          zIndex: 1,
        }}
      >
        <NavBarAvatar hideProfile />
      </Stack>
      <Stack
        gap={2}
        sx={{
          maxWidth: { xs: '100%', md: '50%', lg: '582px' },
          width: '100%',
          backdropFilter: 'blur(25px)',
          px: { xs: 2, md: 6 },
          justifyContent: 'center',
          height: '100%',
          background: alpha(theme.palette.common.black, 0.03),
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: { xs: 20, md: 48 },
            left: { xs: 20, md: 48 },
          }}
        >
          <img
            src="/favicon-192.png"
            alt={t('logo-alternative-text')}
            width="30"
          />
        </Box>
        <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
          {t('title')}
        </Typography>
        <Stack direction="column" gap={3}>
          <Box>
            <Typography component="h2" variant="h6" fontSize={16}>
              {t('form.title')}
            </Typography>
            <Typography component="p" variant="caption">
              {t('form.caption')}
            </Typography>
          </Box>
          <FormProvider {...methods}>
            <Form onSubmit={onSubmit} isLoading={updateMutation.isLoading} />
          </FormProvider>
        </Stack>
      </Stack>
    </Stack>
  );
}
