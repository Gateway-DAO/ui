import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { useMutation } from 'react-query';

import { Box, Snackbar, Stack, Typography } from '@mui/material';

import { ROUTES } from '../../../constants/routes';
import { useSnackbar } from '../../../hooks/use-snackbar';
import { useAuth } from '../../../providers/auth';
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

  const updateMutation = useMutation(
    'updateProfile',
    gqlAuthMethods.update_user_profile,
    {
      onSuccess(data) {
        snackbar.handleClick({ message: 'Profile updated!' });
        onUpdateMe((oldMe) => ({
          ...oldMe,
          ...data.update_users_by_pk,
          init: true,
        }));
        router.push(ROUTES.EXPLORE);
      },
    }
  );

  const onSubmit = (data: NewUserSchema) => {
    updateMutation.mutate({ id: me.id, ...data });
  };

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
