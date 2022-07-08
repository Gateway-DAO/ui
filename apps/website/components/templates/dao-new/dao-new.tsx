import useTranslation from 'next-translate/useTranslation';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';

import { TOKENS } from '@gateway/theme';

import { Box, Stack, Typography } from '@mui/material';

import { AboutForm } from './form/form';
import { schema, NewDAOSchema } from './schema';

export function NewDAOTemplate() {
  const { t } = useTranslation("dao-new");
  const methods = useForm<NewDAOSchema>({
    resolver: yupResolver(schema),
  });
  return (
    <Stack
      component="form"
      direction="column"
      gap={6}
      p={TOKENS.CONTAINER_PX}
      onSubmit={(data) => {
        console.log(data);
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
        gap={6}
      >
        <Box sx={{ width: '25%' }}>
          <Typography variant="h5">{t('about.title')}</Typography>
        </Box>
        <FormProvider {...methods}>
          <Box sx={{ width: '75%' }}>
            <AboutForm />
          </Box>
        </FormProvider>
      </Stack>
    </Stack>
  );
}
