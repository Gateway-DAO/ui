import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { PartialDeep } from 'type-fest';

import { TOKENS } from '@gateway/theme';

import { ArrowBack } from '@mui/icons-material';
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material';

import { Daos } from '../../../services/graphql/types.generated';
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
        <LoadingButton variant="contained" type="submit" isLoading={isLoading}>
          {t('submit')}
        </LoadingButton>
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
            <AboutForm isEdit={!!dao} />
          </Box>
        </FormProvider>
      </Stack>
    </Stack>
  );
}
