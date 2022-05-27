import Image from 'next/image';
import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';

import { TOKENS } from '@gateway/theme';

import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Avatar,
  Box,
  Chip,
  Grid,
  Stack,
  Typography,
  Divider,
  Button,
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

  const [accomplishmentsCount, setAccomplishmentsCount] = useState(1);

  const getAccomplishmentCards = (count) => {
    const cards = [];
    for (let i = 0; i < count; i++) {
      cards.push(
        <AccomplishmentsForm
          onSubmit={(data) => {
            console.log(data);
          }}
        />
      );
    }
    return cards;
  };

  return (
    <Stack gap={6} p={TOKENS.CONTAINER_PX}>
      <Box>
        <Image
          src="/favicon-512.png"
          alt="gateway-logo"
          height={40}
          width={40}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          top: '40px',
          right: '50px',
          cursor: 'pointer',
        }}
      >
        <Avatar
          src={randomNftUrl}
          sx={{
            width: 30,
            height: 30,
          }}
        />
        <ArrowDropDownIcon style={{ position: 'relative', top: '5px' }} />
      </Box>
      <Typography variant="h5" sx={{ marginBottom: '100px' }}>
        Earn Proof of Credential
      </Typography>
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="flex-start"
        gap={6}
      >
        {/* Credential details */}
        <Grid container>
          <Grid item xs={5}>
            <Typography variant="h6" fontWeight="bold">
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
          <Grid container>
            <Grid item xs={5}>
              <Typography variant="h6" fontWeight="bold">
                Your Details
              </Typography>
              <Typography variant="caption">
                Customize Your Credential
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <CredentialDetailsForm
                onSubmit={(data) => {
                  console.log(data);
                }}
              />
            </Grid>
          </Grid>
        </FormProvider>
        <Divider light sx={{ width: '100%' }} />
        {/* Proudest Accomplishments form */}
        <FormProvider {...accomplishmentsMethods}>
          <Grid container>
            <Grid item xs={5}>
              <Typography variant="h6" fontWeight="bold">
                Proudest Accomplishments
              </Typography>
              <Typography variant="caption">
                Tell the world about your greatest accomplishments and get it
                verified!
              </Typography>
            </Grid>
            <Grid item xs={5}>
              {getAccomplishmentCards(accomplishmentsCount)}
            </Grid>
          </Grid>
        </FormProvider>
        <Grid container>
          <Grid item xs={5}></Grid>
          <Grid
            item
            xs={5}
            sx={{
              display: 'flex',
              border: '1px solid grey',
              padding: '25px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => setAccomplishmentsCount(accomplishmentsCount + 1)}
          >
            <AddBoxIcon sx={{ marginRight: '15px' }} />
            <Typography variant="h6" fontWeight="bold">
              Add an Accomplishment
            </Typography>
          </Grid>
        </Grid>
      </Stack>
      <Box alignSelf="flex-end" marginRight="300px">
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained" sx={{ marginLeft: '10px' }}>
          Submit
        </Button>
      </Box>
      <Box alignSelf="flex-end" marginRight="300px">
        <ArrowCircleUpIcon
          fontSize="large"
          onClick={() => window.scrollTo(0, 0)}
          style={{ cursor: 'pointer' }}
        />
      </Box>
    </Stack>
  );
}
