import Image from 'next/image';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';

import { TOKENS } from '@gateway/theme';

import {
  Avatar,
  Box,
  Chip,
  Grid,
  Stack,
  Typography,
  Divider,
} from '@mui/material';

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
  const credentialImgUrl =
    'https://i.postimg.cc/6QJDW2r1/olympus-credential-picture.png';
  const randomNftUrl = 'https://i.ibb.co/bzzgBfT/random-nft.png';

  return (
    <Stack gap={6} p={TOKENS.CONTAINER_PX}>
      <Typography variant="h6">Earn Proof of Credential</Typography>
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="flex-start"
        gap={6}
      >
        {/* Credential details */}
        <Grid container>
          <Grid item xs={5}>
            <Typography variant="subtitle1" fontWeight="bold">
              Details
            </Typography>
            <Typography variant="caption">
              Basic Details of Credential
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Stack direction="row">
              {/* TODO: Responsiveness */}
              <Image
                loader={() => credentialImgUrl}
                src={credentialImgUrl}
                height={300}
                width={900}
                alt="credential image"
                style={{ borderRadius: '5px' }}
              />
              <Box
                sx={{
                  position: 'relative',
                  minHeight: '300px',
                  maxWidth: '500px',
                  marginLeft: '32px',
                }}
              >
                <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                  Olympus Operations Working Group - Season 2
                </Typography>
                <Chip label="Contributor" sx={{ marginBottom: '20px' }} />
                <Box>
                  <Typography variant="caption">
                    The Operations Group at Olympus is responsible for making
                    sure that work is going smoothly. Our key goals this season
                    are to make a new onboarding flow and increase team morale.
                  </Typography>
                </Box>
                <Box sx={{ position: 'absolute', bottom: '0' }}>
                  <Typography variant="caption">Created by</Typography>
                  <Chip
                    avatar={<Avatar alt="chip avatar" src={randomNftUrl} />}
                    label="Harisson Santos"
                    sx={{ marginLeft: '10px' }}
                  />
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <Divider light sx={{ width: '100%' }} />
        {/* Credential details form */}
        <FormProvider {...credentialDetailsMethods}>
          <Box sx={{ width: '25%' }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Your Details
            </Typography>
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
            <Typography variant="subtitle1" fontWeight="bold">
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
