import Image from 'next/image';

import { TOKENS } from '@gateway/theme';

import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArticleIcon from '@mui/icons-material/Article';
import FolderIcon from '@mui/icons-material/Folder';
import IosShareIcon from '@mui/icons-material/IosShare';
import LooksOneIcon from '@mui/icons-material/LooksOne';
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

const DetailsFieldset = ({ children }) => (
  <fieldset
    style={{
      display: 'flex',
      border: 'none',
      marginBottom: '15px',
    }}
  >
    {children}
  </fieldset>
);

const details = [
  { legend: 'Role', value: 'Business Operation Analyst' },
  { legend: 'Level of Commitment', value: 'High' },
  { legend: 'Start Date', value: '10/02/2021' },
  { legend: 'End Date', value: 'Present' },
  {
    legend: 'Day to Day Responsibilities',
    value:
      'In a couple of sentences, write about what you were generally responsible for in this working group.',
  },
];

export function ViewCredentialTemplate() {
  const credentialImgUrl =
    'https://i.postimg.cc/6QJDW2r1/olympus-credential-picture.png';
  const randomNftUrl = 'https://i.ibb.co/bzzgBfT/random-nft.png';

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
          alignItems: 'center',
          position: 'absolute',
          top: '40px',
          right: '50px',
          cursor: 'pointer',
        }}
      >
        <IosShareIcon style={{ marginRight: '15px' }} />
        <Button variant="outlined">Check profile</Button>
      </Box>
      <Typography variant="h5" sx={{ marginBottom: '20px' }}>
        Shriram Chandra <br /> Proof of Credential
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
                width={1200}
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
        {/* Your details */}
        <Grid container>
          <Grid item xs={5}>
            <Typography variant="h6" fontWeight="bold">
              Your Details
            </Typography>
            <Typography variant="caption">Customize Your Credential</Typography>
          </Grid>
          <Grid item xs={5}>
            {details.map((detail, index) => (
              <DetailsFieldset key={index}>
                <legend>{detail.legend}</legend>
                <Typography variant="h6" fontWeight="bold">
                  {detail.value}
                </Typography>
              </DetailsFieldset>
            ))}
          </Grid>
        </Grid>
        <Divider light sx={{ width: '100%' }} />
        {/* Proudest Accomplishments */}
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
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
              }}
            >
              <LooksOneIcon style={{ marginRight: '5px' }} />
              Gateway Project
            </Typography>
            <Typography variant="caption">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              fermentum dui urna, ac sagittis augue aliquam vel. Duis enim ante,
              dictum sit amet mauris sed, tristique placerat magna. Suspendisse
              est odio, maximus ut ante placerat, pulvinar tincidunt lorem.
              Suspendisse sed vehicula lectus, nec pulvinar magna. Nullam eu
              imperdiet erat. Proin iaculis sem vitae massa gravida consequat.
              Praesent diam nulla, commodo ut tincidunt in, convallis eu urna.
              Sed viverra diam magna, quis congue nunc aliquet eget. Sed porta
              ligula ac neque cursus, a consequat neque pellentesque. Vestibulum
              viverra porta aliquet. Suspendisse eget mi ut risus imperdiet
              ultrices. Nullam vitae tortor felis.
            </Typography>
            <Box sx={{ marginTop: '30px' }}>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                style={{ marginBottom: '20px' }}
              >
                Proof of Work
              </Typography>
              <Box>
                <Typography
                  variant="subtitle2"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <ArticleIcon style={{ marginRight: '5px' }} /> Gateway
                  Prototype
                </Typography>
                <Typography variant="caption">
                  User Flows and Experience designed at Figma.
                </Typography>
                <Divider light sx={{ width: '100%', margin: '10px 0' }} />
                <Typography
                  variant="subtitle2"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <FolderIcon style={{ marginRight: '5px' }} />
                  Gateway Branding
                </Typography>
                <Typography variant="caption">
                  Brand Kit designed for Gateway
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Stack>
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
