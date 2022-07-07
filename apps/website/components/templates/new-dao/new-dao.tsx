import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';

import { TOKENS } from '@gateway/theme';

import { Box, Stack, Typography } from '@mui/material';

import { Form } from './form';
import { schema, NewDAOSchema } from './schema';

export function NewDAOTemplate() {
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
      <Typography variant="h4">Create DAO</Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        gap={6}
      >
        <Box sx={{ width: '25%' }}>
          <Typography variant="h5">About</Typography>
        </Box>
        <FormProvider {...methods}>
          <Box sx={{ width: '75%' }}>
            <Form />
          </Box>
        </FormProvider>
      </Stack>
    </Stack>
  );
}
