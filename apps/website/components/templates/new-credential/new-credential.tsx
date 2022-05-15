import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';

import { Box, Stack, Typography } from '@mui/material';

import { Form } from './form';
import { schema, NewCredentialSchema } from './schema';

export function NewCredentialTemplate() {
  const methods = useForm<NewCredentialSchema>({
    resolver: yupResolver(schema),
  });
  return (
    <Stack gap={6}>
      <Typography variant="h4">Create Proof of Credential</Typography>
      <Stack direction="row" justifyItems="space-between">
        <Box sx={{ flex: 0.75 }}>
          <Typography variant="h5">Details</Typography>
          <Typography variant="caption">
            Use typography to present your design and content as clearly and
            efficiently as possible.
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <FormProvider {...methods}>
            <Form />
          </FormProvider>
        </Box>
      </Stack>
    </Stack>
  );
}
