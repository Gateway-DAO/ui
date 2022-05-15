import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';

import { TOKENS } from '@gateway/theme';

import { Box, Stack, Typography } from '@mui/material';

import { AvatarUploadCard } from './avatar-upload-card';
import { Form } from './form';
import { schema, NewCredentialSchema } from './schema';

export function NewCredentialTemplate() {
  const methods = useForm<NewCredentialSchema>({
    resolver: yupResolver(schema),
  });
  return (
    <Stack direction="column" gap={6} p={TOKENS.CONTAINER_PX}>
      <Typography variant="h4">Create Proof of Credential</Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        gap={6}
      >
        <Box sx={{ width: '25%' }}>
          <Typography variant="h5">Details</Typography>
          <Typography variant="caption">
            Use typography to present your design and content as clearly and
            efficiently as possible.
          </Typography>
        </Box>
        <FormProvider {...methods}>
          <Box sx={{ width: '25%' }}>
            <Form
              onSubmit={(data) => {
                console.log(data);
              }}
            />
          </Box>
          <AvatarUploadCard />
        </FormProvider>
      </Stack>
    </Stack>
  );
}
