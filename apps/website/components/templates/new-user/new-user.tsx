import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';

import { Box, Dialog, Stack, Typography } from '@mui/material';

import { AvatarUploadCard } from './avatar-upload-card';
import { AvatarUploadCardMobile } from './avatar-upload-card-mobile';
import { Form } from './form';
import { schema, NewUserSchema } from './schema';

export function NewUserTemplate() {
  const { t } = useTranslation('dashboard-new-user');
  const methods = useForm<NewUserSchema>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onSubmit = (_data: NewUserSchema) => {
    router.push('/home');
  };

  return (
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
            <AvatarUploadCardMobile />
            <Form onSubmit={onSubmit} />
          </FormProvider>
        </Stack>
      </Stack>
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
        }}
      >
        <FormProvider {...methods}>
          <AvatarUploadCard />
        </FormProvider>
      </Box>
    </Stack>
  );
}
