import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { useMutation } from 'react-query';

import { TOKENS } from '@gateway/theme';

import { ArrowBack } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import { useUploadImage } from '../../../hooks/use-upload-image';
import { useAuth } from '../../../providers/auth';
import { AboutForm } from './form/form';
import { schema, NewDAOSchema } from './schema';

export function NewDAOTemplate() {
  const { me, gqlAuthMethods } = useAuth();
  const { t } = useTranslation('dao-new');
  const methods = useForm<NewDAOSchema>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const uploadImage = useUploadImage();

  /* TODO: FINISH IT */
  const createDAOMutation = useMutation(
    '',
    () => /* gqlAuthMethods.create_dao */ ({})
  );

  const onSubmit = async (data: NewDAOSchema) => {
    try {
      const [logo, bg] = await Promise.all([
        uploadImage({
          base64: data.logo_url,
          name: `dao-logo-${data.name}-${me.id}`,
        }),
        uploadImage({
          base64: data.background_url,
          name: `dao-bg-${data.name}-${me.id}`,
        }),
      ]);

      /* TODO: FINISH IT */
    } catch (e) {
      console.log('upload image error', e);
    }
  };

  return (
    <Stack
      component="form"
      direction="column"
      gap={6}
      onSubmit={methods.handleSubmit(onSubmit, (error) => {
        console.log('Error', error);
      })}
      sx={{
        px: TOKENS.CONTAINER_PX,
        pb: 10,
        gap: {
          xs: 4,
          md: 6,
        },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mx: -0.5, pt: { xs: 1.5, md: 5 }, pb: { xs: 1.5, md: 0 } }}
      >
        <IconButton onClick={() => router.back()}>
          <Avatar>
            <ArrowBack />
          </Avatar>
        </IconButton>
        <Button variant="contained" type="submit">
          Create
        </Button>
      </Stack>
      <Box>
        <Typography variant="h4">{t('title')}</Typography>
        <Typography variant="caption">{t('subtitle')}</Typography>
      </Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        gap={4}
        sx={{
          flexFlow: {
            xs: 'column',
            md: 'row',
          },
        }}
      >
        <Box sx={{ width: { xs: '100%', md: '25%' } }}>
          <Typography variant="h5">{t('about.title')}</Typography>
        </Box>
        <FormProvider {...methods}>
          <Box sx={{ width: { xs: '100%', md: '75%' } }}>
            <AboutForm />
          </Box>
        </FormProvider>
      </Stack>
    </Stack>
  );
}
