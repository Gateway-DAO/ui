import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { useMutation } from 'react-query';

import { Box, Snackbar, Stack, Typography } from '@mui/material';

import { ROUTES } from '../../../constants/routes';
import { useSnackbar } from '../../../hooks/use-snackbar';
import { useUploadImage } from '../../../hooks/use-upload-image';
import { useAuth } from '../../../providers/auth';
import { ErrorResponse } from '../../../types/graphql';
import { NavBarAvatar } from '../../organisms/navbar/navbar-avatar';
import { AvatarUploadCard } from './avatar-upload-card';
import { Form } from './form';
import { schema, NewUserSchema, defaultValues } from './schema';

/*
  TODO: Downsize the image to a max size
  TODO: Create an api endpoint for photo manipulation
*/

export function NewUserTemplate() {
  const { t } = useTranslation('dashboard-new-user');
  const { me, gqlAuthMethods, onUpdateMe } = useAuth();
  const methods = useForm<NewUserSchema>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues(me),
  });

  const snackbar = useSnackbar();

  const router = useRouter();
  const uploadImage = useUploadImage();

  const updateMutation = useMutation(
    'updateProfile',
    async ({ pfp, ...data }: NewUserSchema) => {
      const uploadedPicture = await uploadImage({
        base64: pfp,
        name: `${me.id}-pfp`,
      });

      return gqlAuthMethods.update_user_profile({
        ...data,
        id: me.id,
        pic_id: uploadedPicture.upload_image.id,
      });
    },
    {
      onSuccess(data) {
        snackbar.onOpen({ message: 'Profile created!' });
        onUpdateMe((oldMe) => ({
          ...oldMe,
          ...data.update_users_by_pk,
          init: true,
        }));
        router.replace(ROUTES.EXPLORE);
      },
      onError(error: ErrorResponse) {
        let totalUnmappedErrors = 0;
        error.response.errors?.forEach(({ message, extensions }) => {
          if (
            extensions.code === 'constraint-violation' &&
            message.includes('users_email_address_uindex')
          ) {
            return methods.setError('email_address', {
              message: 'Email already in use',
            });
          }
          if (
            extensions.code === 'constraint-violation' &&
            message.includes('user_username_uindex')
          ) {
            return methods.setError('username', {
              message: 'Username already in use',
            });
          }
          totalUnmappedErrors++;
        });

        if (totalUnmappedErrors) {
          snackbar.onOpen({ message: 'Unknown server error', type: 'error' });
        }
      },
    }
  );

  const onSubmit = (data: NewUserSchema) => updateMutation.mutate(data);

  return (
    <>
      <Stack style={{ position: 'absolute', top: '50px', right: '50px' }}>
        <NavBarAvatar hideProfile />
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
        gap={2}
        sx={{
          width: '100%',
          display: { xs: 'block', md: 'flex' },
          alignSelf: 'center',
          maxWidth: (theme) => theme.breakpoints.values.lg,
        }}
      >
        <Stack
          direction="column"
          gap={7.5}
          sx={{ maxWidth: { xs: '100%', md: '50%', lg: '40%' }, width: '100%' }}
        >
          <Typography component="h1" variant="h4">
            {t('title')}
          </Typography>
          <Stack direction="column" gap={4}>
            <Box>
              <Typography component="h2" variant="h5">
                {t('form.title')}
              </Typography>
              <Typography component="p" variant="caption">
                {t('form.caption')}
              </Typography>
            </Box>
            <FormProvider {...methods}>
              <AvatarUploadCard
                showUserData={false}
                sx={{
                  display: { xs: 'flex', md: 'none' },
                }}
              />
              <Form onSubmit={onSubmit} isLoading={updateMutation.isLoading} />
            </FormProvider>
          </Stack>
        </Stack>

        <FormProvider {...methods}>
          <AvatarUploadCard
            sx={{
              display: { xs: 'none', md: 'flex' },
              width: 400,
            }}
          />
        </FormProvider>
      </Stack>
      <Snackbar
        anchorOrigin={{
          vertical: snackbar.vertical,
          horizontal: snackbar.horizontal,
        }}
        open={snackbar.open}
        onClose={snackbar.handleClose}
        message={snackbar.message}
        key={snackbar.vertical + snackbar.horizontal}
      />
    </>
  );
}
