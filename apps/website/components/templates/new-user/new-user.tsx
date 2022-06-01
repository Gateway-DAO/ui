import { useSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { useMutation } from 'react-query';

import { Box, Dialog, Snackbar, Stack, Typography } from '@mui/material';

import { useSnackbar } from '../../../hooks/use-snackbar';
import { gqlMethods } from '../../../services/api';
import { Users } from '../../../services/graphql/types.generated';
import { AvatarUploadCard } from './avatar-upload-card';
import { Form } from './form';
import { schema, NewUserSchema, defaultValues } from './schema';

/*
  TODO: Downsize the image to a max size
  TODO: Create an api endpoint for photo manipulation
*/
type Props = {
  user: Partial<Users>;
};
export function NewUserTemplate({ user }: Props) {
  const { t } = useTranslation('dashboard-new-user');
  const methods = useForm<NewUserSchema>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues(user),
  });

  const snackbar = useSnackbar();

  const router = useRouter();
  const session = useSession();

  const updateMutation = useMutation(
    'updateProfile',
    session.data?.user && gqlMethods(session.data.user).update_user_profile,
    {
      onSuccess() {
        snackbar.handleClick({ message: 'Profile updated!' });
        router.push('/home');
      },
    }
  );

  const onSubmit = (data: NewUserSchema) => {
    updateMutation.mutate({ id: user.id, ...data });
  };

  return (
    <>
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
