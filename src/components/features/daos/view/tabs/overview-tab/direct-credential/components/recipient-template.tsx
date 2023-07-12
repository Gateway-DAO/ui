import { createGateSchema } from '@/components/features/gates/create/schema';
import { DirectWallets } from '@/components/features/gates/create/tasks/direct/direct-wallets';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Dispatch, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export default function RecipientTemplate({
  updateFormState,
  handleStep,
  input,
}: {
  updateFormState: Dispatch<any>;
  handleStep: (value: boolean) => void;
  input: any;
}) {
  const methods = useForm({
    resolver: zodResolver(createGateSchema),
    mode: 'onBlur',
  });
  return (
    <Stack direction={'column'} mx={7} mb={5}>
      <Box>
        <Typography variant="h5">Add recipient</Typography>
        <Typography variant="body2">
          Send this credential directly to someone or group of people
        </Typography>
        {/* <Button onClick={() => handleStep(true)}>
          Click to enable continue button(page is pending to be made)
        </Button> */}
      </Box>
      <FormProvider {...methods}>
        <Stack>
          <DirectWallets handleStep={handleStep} />
        </Stack>
      </FormProvider>
    </Stack>
  );
}
