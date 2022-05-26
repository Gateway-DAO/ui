import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';

import { TOKENS } from '@gateway/theme';

import { Box, Stack, Typography } from '@mui/material';

import { AccomplishmentsForm } from './accomplishments-form';
import {
  accomplishmentsSchema,
  AccomplishmentsTypes,
} from './accomplishments-schema';
import { CredentialDetailsForm } from './credential-details-form';
import {
  credentialDetailsSchema,
  CredentialDetailsTypes,
} from './credential-details-schema';

export function EarnCredentialTemplate() {
  const credentialDetailsMethods = useForm<CredentialDetailsTypes>({
    resolver: yupResolver(credentialDetailsSchema),
  });
  const accomplishmentsMethods = useForm<AccomplishmentsTypes>({
    resolver: yupResolver(accomplishmentsSchema),
  });

  return (
    <Stack direction="column" gap={6} p={TOKENS.CONTAINER_PX}>
      <Typography variant="h6">Earn Proof of Credential</Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        gap={6}
      >
        <Box sx={{ width: '25%' }}>
          <Typography variant="subtitle1">Details</Typography>
          <Typography variant="caption">
            Use typography to present your design and content as clearly and
            efficiently as possible.
          </Typography>
          {/* TODO: Credential details */}
        </Box>
        {/* Credential details form */}
        <FormProvider {...credentialDetailsMethods}>
          <Box sx={{ width: '25%' }}>
            <Typography variant="subtitle1">Your Details</Typography>
            <Typography variant="caption">Customize Your Credential</Typography>
            <CredentialDetailsForm
              onSubmit={(data) => {
                console.log(data);
              }}
            />
          </Box>
        </FormProvider>
        {/* Proudest Accomplishments form */}
        <FormProvider {...accomplishmentsMethods}>
          <Box sx={{ width: '25%' }}>
            <Typography variant="subtitle1">
              Proudest Accomplishments
            </Typography>
            <Typography variant="caption">
              Tell the world about your greatest accomplishments and get it
              verified!
            </Typography>
            <AccomplishmentsForm
              onSubmit={(data) => {
                console.log(data);
              }}
            />
          </Box>
        </FormProvider>
      </Stack>
    </Stack>
  );
}
