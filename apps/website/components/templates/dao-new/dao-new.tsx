import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { PartialDeep } from 'type-fest';

import { TOKENS } from '@gateway/theme';

import { ArrowBack } from '@mui/icons-material';
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material';

import { Daos } from '../../../services/hasura/types';
import { LoadingButton } from '../../atoms/loading-button';
import { AboutForm } from './form/form';
import { schema, NewDAOSchema, defaultValues } from './schema';

/* TODO:

- default values a partir da prop
- modificar o envio do form tbm para aceitar o edit
- fazer o handle de create/edit para tratar as imagens (verificar se ja existe ou nao)
*/

type Props = {
  onSubmit: (data: NewDAOSchema) => Promise<unknown>;
  isLoading: boolean;
  dao?: PartialDeep<Daos>;
};

export function NewDAOTemplate({ dao, onSubmit, isLoading }: Props) {
  const { t } = useTranslation(dao ? 'dao-edit' : 'dao-new');
  const methods = useForm<NewDAOSchema>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues(dao),
  });

  const router = useRouter();

  return (
    <Stack
      component="form"
      direction="column"
      gap={6}
      onSubmit={methods.handleSubmit(onSubmit, (error) => {
        console.log('Error', error);
      })}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          px: TOKENS.CONTAINER_PX,
          gap: {
            xs: 4,
            md: 6,
          },
          paddingTop: { xs: '24px', md: '40px' },
          background:
            ' linear-gradient(180deg, #10041C 0%, rgba(16, 4, 28,0) 100%)',
          position: 'fixed',
          width: '100%',
          zIndex: '10000',
        }}
      >
        <IconButton onClick={() => router.back()}>
          <Avatar>
            <ArrowBack />
          </Avatar>
        </IconButton>
        <LoadingButton
          variant="contained"
          type="submit"
          isLoading={isLoading}
          sx={{
            position: 'absolute',
            top: { xs: '26px', md: '52px' },
            right: { xs: '26px', md: '92px' },
          }}
        >
          {t('submit')}
        </LoadingButton>
      </Stack>
      <Stack
        sx={{
          mt: 18,
          mx: TOKENS.CONTAINER_PX,
          pb: 10,
          gap: {
            xs: 4,
            md: 6,
          },
        }}
      >
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
              <AboutForm isEdit={!!dao} />
            </Box>
          </FormProvider>
        </Stack>
      </Stack>
    </Stack>
  );
}
